import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function Timer() {
  const timerRef = useRef(null)

  const [millisecond, setMillisecond] = useState(0)
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [hour, setHour] = useState(0)
  const [running, setRunning] = useState(false)
  const [lap, setLap] = useState([])

  const changeMillisecond = (previous) => {
    if (previous === 99) {
      setSecond(changeSecond)
      return 0
    }
    return previous + 1
  }

  const changeSecond = (previous) => {
    if (previous === 59) {
      setMinute(changeMinute)
      return 0
    }
    return previous + 1
  }

  const changeMinute = (previous) => {
    if (previous === 59) {
      setHour((previous) => previous + 1)
      return 0
    }
    return previous + 1
  }

  useEffect(() => {
    if (!running) return

    timerRef.current = setInterval(() => {
      setMillisecond(changeMillisecond)
    }, 10)

    return () => clearInterval(timerRef.current)
  }, [running])

  const reset = () => {
    setRunning(false)
    setMillisecond(0)
    setSecond(0)
    setMinute(0)
    setHour(0)
    setLap([])
  }

  const onLap = () => {
    setLap((previous) => [
      ...previous,
      { hour, minute, second, millisecond, id: uuidv4() },
    ])
  }

  const hasStarted = hour > 0 || minute > 0 || second > 0 || millisecond > 0

  const pad = (value) => String(value).padStart(2, '0')

  return (
    <div id="main" className="flex min-h-screen items-center justify-center">
      <div className="mt-52 h-125 w-125 bg-orange-500">
        <div className="mt-5 flex w-full justify-center gap-2.5 text-7xl">
          <h3>{hour}</h3>:<h3>{minute}</h3>:<h3>{second}</h3>.
          <h3>{pad(millisecond)}</h3>
        </div>

        <div className="m-auto mt-5 flex w-[80%] justify-between">
          <Button
            color="green"
            variant="solid"
            onClick={onLap}
            disabled={!running}
            className="bg-green-600! border-green-600! text-white! hover:bg-green-700! disabled:bg-green-300! disabled:border-green-300! disabled:text-white!"
          >
            Lap
          </Button>

          {running ? (
            <Button onClick={() => setRunning(false)}>Pause</Button>
          ) : (
            <Button onClick={() => setRunning(true)}>
              {hasStarted ? 'Resume' : 'Start'}
            </Button>
          )}

          <Button color="green" variant="solid" onClick={reset}>
            Restart
          </Button>
        </div>

        <div className="mt-3 flex w-full flex-col items-center gap-4">
          {lap.map(({ id, hour, minute, second, millisecond }) => (
            <div key={id} className="flex justify-center gap-2.5">
              <h3>{hour}</h3>:<h3>{minute}</h3>:<h3>{second}</h3>.
              <h3>{pad(millisecond)}</h3>
            </div>
          ))}
          {lap.length > 0 && <Button onClick={() => setLap([])}>Reset</Button>}
        </div>
      </div>
    </div>
  )
}

export default Timer
