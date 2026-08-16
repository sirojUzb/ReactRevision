import { authReducer } from './authReducer'
import { productsReducer } from './productsReducer'
import { cartReducer } from './cartReducer'

export const STORAGE_KEY = 'ecommerce-state'

export function rootReducer(state, action) {
  return {
    auth: authReducer(state.auth, action),
    products: productsReducer(state.products, action),
    cart: cartReducer(state.cart, action),
  }
}

export function loadInitialState() {
  const defaultState = {
    auth: authReducer(undefined, {}),
    products: productsReducer(undefined, {}),
    cart: cartReducer(undefined, {}),
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState

    const saved = JSON.parse(raw)
    return {
      ...defaultState,
      cart: saved.cart ?? defaultState.cart,
      auth: { ...defaultState.auth, user: saved.user ?? null },
    }
  } catch {
    return defaultState
  }
}
