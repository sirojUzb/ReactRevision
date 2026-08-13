import { useEffect, useRef, useState } from 'react'

function formatTime(totalSeconds) {
  const pad = (n) => String(n).padStart(2, '0')
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${pad(minutes)}:${pad(seconds)}`
}

function RefTimer() {
  const [seconds, setSeconds] = useState(0)
  const [status, setStatus] = useState('idle')
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  const startInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
  }

  const handleStart = () => {
    setStatus('running')
    startInterval()
  }

  const handlePause = () => {
    clearInterval(intervalRef.current)
    setStatus('paused')
  }

  const handleReset = () => {
    clearInterval(intervalRef.current)
    setStatus('idle')
    setSeconds(0)
    setLaps([])
  }

  const handleLap = () => {
    setLaps((prev) => [...prev, seconds])
  }

  const isRunning = status === 'running'

  return (
    <div className="flex grow flex-col items-center justify-center gap-6">
      <h1>Timer</h1>

      <div className="flex min-w-80 flex-col items-center gap-5 rounded-2xl border border-amber-300 bg-amber-300 p-8 shadow-lg">
        <div className="flex items-center gap-2 text-sm text-amber-950">
          <span
            className={`h-2 w-2 rounded-full bg-amber-950 ${
              isRunning ? 'animate-pulse' : ''
            }`}
          />
          {status === 'running'
            ? 'Ishlamoqda'
            : status === 'paused'
              ? 'Pauzada'
              : 'Tayyor'}
        </div>

        <p className="m-0 font-mono text-6xl font-medium tracking-wide text-amber-950">
          {formatTime(seconds)}
        </p>

        <div className="flex gap-3">
          {isRunning ? (
            <button
              onClick={handlePause}
              className="cursor-pointer rounded-lg border-2 border-transparent bg-amber-950 px-6 py-2.5 text-base text-amber-50 transition hover:border-amber-700"
            >
              Pause
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="cursor-pointer rounded-lg border-2 border-transparent bg-amber-950 px-6 py-2.5 text-base text-amber-50 transition hover:border-amber-700"
            >
              {status === 'paused' ? 'Davom ettirish' : 'Start'}
            </button>
          )}
          <button
            onClick={handleLap}
            disabled={!isRunning}
            className="cursor-pointer rounded-lg border-2 border-transparent bg-amber-100 px-6 py-2.5 text-base text-amber-950 transition hover:enabled:border-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Lap
          </button>
          <button
            onClick={handleReset}
            disabled={status === 'idle'}
            className="cursor-pointer rounded-lg border-2 border-transparent bg-amber-100 px-6 py-2.5 text-base text-amber-950 transition hover:enabled:border-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Restart
          </button>
        </div>

        {laps.length > 0 && (
          <ul className="m-0 flex max-h-40 w-full flex-col gap-1 overflow-y-auto p-0">
            {laps
              .map((lap, i) => ({ time: lap, index: i + 1 }))
              .reverse()
              .map((lap) => (
                <li
                  key={lap.index}
                  className="flex justify-between gap-3 rounded-md bg-amber-100 px-2.5 py-1.5 font-mono text-sm text-amber-950"
                >
                  <span>Lap {lap.index}</span>
                  <span>{formatTime(lap.time)}</span>
                </li>
              ))}
          </ul>
        )}

        <p className="m-0 max-w-80 text-center text-xs text-amber-900/70">
          intervalRef — setInterval ID&apos;ni saqlaydi, o&apos;zgarganda
          qayta render bo&apos;lmaydi. useEffect — komponent unmount
          bo&apos;lganda intervalni tozalaydi.
        </p>
      </div>
    </div>
  )
}

export default RefTimer
