import { useEffect, useReducer, useState } from 'react'
import { rootReducer, loadInitialState, STORAGE_KEY } from './store/rootReducer'
import { selectFilteredProducts, selectCategories } from './store/productsReducer'
import ProductList from './ProductList'
import Cart from './Cart'
import AuthPanel from './AuthPanel'
import UserBadge from './UserBadge'
import Toast from './Toast'

function App() {
  const [state, dispatch] = useReducer(rootReducer, undefined, loadInitialState)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    const { password: _password, ...publicUser } = state.auth.user ?? {}
    const persisted = {
      cart: state.cart,
      user: state.auth.user ? publicUser : null,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
  }, [state.cart, state.auth.user])

  const itemCount = state.cart.items.reduce((sum, item) => sum + item.qty, 0)

  useEffect(() => {
    document.title = itemCount > 0 ? `E-STORE (${itemCount})` : 'E-STORE'
  }, [itemCount])

  useEffect(() => {
    if (!toastMessage) return

    const timeoutId = setTimeout(() => setToastMessage(''), 1500)
    return () => clearTimeout(timeoutId)
  }, [toastMessage])

  const handleAdd = (product) => {
    if (!state.auth.user) {
      setToastMessage('Avval tizimga kiring')
      return
    }

    dispatch({ type: 'item-added', payload: product })
    setToastMessage(`${product.name} savatchaga qo'shildi`)
  }

  const handleCheckout = () => {
    dispatch({ type: 'cart-cleared' })
    setToastMessage('Buyurtma qabul qilindi!')
  }

  const filteredProducts = selectFilteredProducts(state.products)
  const categories = selectCategories(state.products)

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center px-4 py-10">
      <h1 className="mb-8 text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50">
        E-STORE
      </h1>

      <div className="grid w-full gap-6 md:grid-cols-[1fr_360px]">
        <ProductList
          products={filteredProducts}
          categories={categories}
          query={state.products.query}
          category={state.products.category}
          onQueryChange={(value) => dispatch({ type: 'query-changed', payload: value })}
          onCategoryChange={(value) => dispatch({ type: 'category-changed', payload: value })}
          onAdd={handleAdd}
        />

        {state.auth.user ? (
          <div>
            <UserBadge user={state.auth.user} dispatch={dispatch} />
            <Cart items={state.cart.items} dispatch={dispatch} onCheckout={handleCheckout} />
          </div>
        ) : (
          <AuthPanel auth={state.auth} dispatch={dispatch} />
        )}
      </div>

      <Toast message={toastMessage} />
    </div>
  )
}

export default App
