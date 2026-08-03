import { useEffect, useState } from 'react'
import './Tasbeh.css'

const TARGET_OPTIONS = [33, 99, 100]
const STORAGE_KEY = 'tasbeh-state'
const DHIKR_PHRASES = ['Subhanalloh', 'Alhamdulillah', 'Allohu Akbar']

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function Tasbeh() {
  const saved = loadInitialState()

  const [count, setCount] = useState(saved?.count ?? 0)
  const [target, setTarget] = useState(saved?.target ?? 33)
  const [rounds, setRounds] = useState(saved?.rounds ?? 0)
  const [pulse, setPulse] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, target, rounds }))
  }, [count, target, rounds])

  const handleCount = () => {
    const next = count + 1

    if (next >= target) {
      setCount(0)
      setRounds((r) => r + 1)
      if (navigator.vibrate) navigator.vibrate(200)
      setPulse(true)
      setTimeout(() => setPulse(false), 300)
      setShowCongrats(true)
      setTimeout(() => setShowCongrats(false), 1800)
    } else {
      setCount(next)
    }
  }

  const handleReset = () => {
    setCount(0)
    setRounds(0)
  }

  const progress = Math.round((count / target) * 100)
  const phrase = target === 33 ? DHIKR_PHRASES[rounds % 3] : null

  return (
    <div className="tasbeh">
      {showCongrats && (
        <div className="congrats-overlay">
          <span className="congrats-emoji">🎉</span>
          <span className="congrats-text">Congrats!</span>
        </div>
      )}

      <h1>Onlayn Tasbeh</h1>

      <div className="target-select">
        {TARGET_OPTIONS.map((option) => (
          <button
            key={option}
            className={option === target ? 'target-btn active' : 'target-btn'}
            onClick={() => {
              setTarget(option)
              setCount(0)
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {phrase && (
        <h2 className="phrase" key={rounds}>
          {phrase}
        </h2>
      )}

      <button
        className={pulse ? 'counter-btn pulse' : 'counter-btn'}
        onClick={handleCount}
      >
        <span className="count">{count}</span>
        <span className="target">/ {target}</span>
      </button>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="rounds">Bajarilgan davralar: {rounds}</p>

      <button className="reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  )
}

export default Tasbeh
