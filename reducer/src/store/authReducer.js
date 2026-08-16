export const DEMO_USER = {
  id: 1,
  name: 'Demo foydalanuvchi',
  email: 'demo@example.com',
  password: 'demo1234',
}

const initialAuthState = {
  user: null,
  users: [DEMO_USER],
  error: null,
}

export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'registered': {
      const { name, email, password } = action.payload
      const alreadyExists = state.users.some((user) => user.email === email)

      if (alreadyExists) {
        return { ...state, error: "Bu email bilan foydalanuvchi allaqachon ro'yxatdan o'tgan" }
      }

      const newUser = { id: Date.now(), name, email, password }
      return { ...state, users: [...state.users, newUser], user: newUser, error: null }
    }

    case 'logged-in': {
      const { email, password } = action.payload
      const found = state.users.find((user) => user.email === email && user.password === password)

      if (!found) {
        return { ...state, error: "Email yoki parol noto'g'ri" }
      }

      return { ...state, user: found, error: null }
    }

    case 'logged-out': {
      return { ...state, user: null }
    }

    case 'auth-error-cleared': {
      return { ...state, error: null }
    }

    default:
      return state
  }
}
