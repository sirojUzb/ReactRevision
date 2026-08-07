import { useEffect, useReducer, useState } from 'react'
import { STORAGE_KEY, cartReducer, loadInitialCart } from './cartReducer'
import products from './products'
import ProductList from './ProductList'
import Cart from './Cart'
import Toast from './Toast'

function App() {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadInitialCart)
  const [query, setQuery] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const itemCount = cart.items.reduce((sum, item) => sum + item.qty, 0)

  useEffect(() => {
    document.title = itemCount > 0 ? `Savatcha (${itemCount})` : 'Shopping Cart'
  }, [itemCount])

  useEffect(() => {
    if (!toastMessage) return

    const timeoutId = setTimeout(() => setToastMessage(''), 1500)
    return () => clearTimeout(timeoutId)
  }, [toastMessage])

  const handleAdd = (product) => {
    dispatch({ type: 'item-added', payload: product })
    setToastMessage(`${product.name} savatchaga qo'shildi`)
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center px-4 py-10">
      <h1 className="mb-8 text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50">
        Shopping Cart
      </h1>

      <div className="grid w-full gap-6 md:grid-cols-[1fr_360px]">
        <ProductList
          products={filteredProducts}
          query={query}
          onQueryChange={setQuery}
          onAdd={handleAdd}
        />
        <Cart items={cart.items} dispatch={dispatch} />
      </div>

      <Toast message={toastMessage} />
    </div>
  )
}

export default App
