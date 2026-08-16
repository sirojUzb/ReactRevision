import { useState } from 'react'

function AuthPanel({ auth, dispatch }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (mode === 'login') {
      dispatch({ type: 'logged-in', payload: { email: form.email, password: form.password } })
    } else {
      dispatch({ type: 'registered', payload: form })
    }
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    dispatch({ type: 'auth-error-cleared' })
  }

  return (
    <aside className="flex h-fit flex-col rounded-xl border border-neutral-200 bg-white p-4 text-left dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex rounded-lg bg-neutral-100 p-1 text-sm dark:bg-neutral-800">
        <button
          type="button"
          onClick={() => switchMode('login')}
          className={`flex-1 rounded-md py-1.5 font-medium transition ${
            mode === 'login'
              ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-50'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          Kirish
        </button>
        <button
          type="button"
          onClick={() => switchMode('register')}
          className={`flex-1 rounded-md py-1.5 font-medium transition ${
            mode === 'register'
              ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-50'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          Ro'yxatdan o'tish
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === 'register' && (
          <input
            type="text"
            required
            placeholder="Ismingiz"
            value={form.name}
            onChange={handleChange('name')}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-violet-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        )}

        <input
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={handleChange('email')}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-violet-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />

        <input
          type="password"
          required
          minLength={4}
          placeholder="Parol"
          value={form.password}
          onChange={handleChange('password')}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-violet-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />

        {auth.error && <p className="text-xs text-red-500">{auth.error}</p>}

        <button
          type="submit"
          className="mt-1 rounded-lg bg-violet-600 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          {mode === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
        </button>
      </form>

      <p className="mt-3 text-xs text-neutral-400">Demo hisob: demo@example.com / demo1234</p>
    </aside>
  )
}

export default AuthPanel
