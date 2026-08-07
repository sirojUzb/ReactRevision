import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Controls,
  Display,
  Hint,
  LapItem,
  Laps,
  ProgressBar,
  ProgressFill,
  Status,
  StatusDot,
  Wrapper,
} from './Timer.styles'

function formatTime(ms) {
  const pad = (n) => String(n).padStart(2, '0')
  const totalSeconds = Math.floor(ms / 1000)
  const centiseconds = Math.floor((ms % 1000) / 10)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor(totalSeconds / 60) % 60
  const seconds = totalSeconds % 60

  const base = hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`

  return `${base}.${pad(centiseconds)}`
}

function Timer() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useEffect(() => {
    if (!isRunning) return

    const startedAt = Date.now() - elapsedMs
    const intervalId = setInterval(() => {
      setElapsedMs(Date.now() - startedAt)
    }, 10)

    return () => clearInterval(intervalId)
  }, [isRunning])

  const totalSeconds = Math.floor(elapsedMs / 1000)

  useEffect(() => {
    document.title = isRunning || elapsedMs > 0
      ? `${formatTime(totalSeconds * 1000)} — Timer`
      : 'useEffect Timer'

    return () => {
      document.title = 'useEffect Timer'
    }
  }, [totalSeconds, isRunning])

  const handleReset = () => {
    if (isRunning) return
    setElapsedMs(0)
    setLaps([])
  }

  const handleLap = () => {
    setLaps((prev) => [...prev, { id: Date.now(), time: elapsedMs }])
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Space') {
        event.preventDefault()
        setIsRunning((running) => !running)
      } else if (event.key.toLowerCase() === 'r' && !isRunning) {
        setElapsedMs(0)
        setLaps([])
      } else if (event.key.toLowerCase() === 'l' && isRunning) {
        setLaps((prev) => [...prev, { id: Date.now(), time: elapsedMs }])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRunning, elapsedMs])

  const deltas = laps.map((lap, i) => lap.time - (laps[i - 1]?.time ?? 0))
  const bestDelta = laps.length > 1 ? Math.min(...deltas) : null
  const worstDelta = laps.length > 1 ? Math.max(...deltas) : null

  return (
    <Wrapper>
      <h1>useEffect Timer</h1>

      <Card>
        <Status>
          <StatusDot $running={isRunning} />
          {isRunning ? 'Ishlamoqda' : elapsedMs > 0 ? 'Pause' : 'Tayyor'}
        </Status>

        <Display>{formatTime(elapsedMs)}</Display>

        <ProgressBar>
          <ProgressFill
            style={{ width: `${((elapsedMs % 60000) / 60000) * 100}%` }}
          />
        </ProgressBar>

        <Controls>
          <Button onClick={() => setIsRunning((running) => !running)}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button $variant="lap" onClick={handleLap} disabled={!isRunning}>
            Lap
          </Button>
          <Button $variant="reset" onClick={handleReset} disabled={isRunning}>
            Reset
          </Button>
        </Controls>

        {laps.length > 0 && (
          <Laps>
            {laps
              .map((lap, i) => ({ ...lap, delta: deltas[i], index: i + 1 }))
              .reverse()
              .map((lap) => (
                <LapItem
                  key={lap.id}
                  $best={lap.delta === bestDelta}
                  $worst={lap.delta === worstDelta}
                >
                  <span>Lap {lap.index}</span>
                  <span>+{formatTime(lap.delta)}</span>
                  <span>{formatTime(lap.time)}</span>
                </LapItem>
              ))}
          </Laps>
        )}

        <Hint>Bo'shliq — start/pause · L — lap · R — reset</Hint>
      </Card>
    </Wrapper>
  )
}

export default Timer
