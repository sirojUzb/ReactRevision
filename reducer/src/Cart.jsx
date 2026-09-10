function Cart({ items, dispatch, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <aside className="flex h-fit flex-col rounded-xl border border-neutral-200 bg-white p-4 text-left dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Savatcha
      </h2>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-neutral-400">Savatcha bo'sh</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-8 w-8 rounded-md object-cover"
                  />
                ) : (
                  <span className="text-xl">{item.emoji}</span>
                )}
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    ${item.price} x {item.qty}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => dispatch({ type: 'qty-decremented', payload: item.id })}
                  className="h-6 w-6 rounded-md border border-neutral-200 text-neutral-600 hover:border-violet-300 dark:border-neutral-700 dark:text-neutral-300"
                >
                  −
                </button>
                <span className="w-5 text-center text-neutral-900 dark:text-neutral-100">
                  {item.qty}
                </span>
                <button
                  onClick={() => dispatch({ type: 'qty-incremented', payload: item.id })}
                  className="h-6 w-6 rounded-md border border-neutral-200 text-neutral-600 hover:border-violet-300 dark:border-neutral-700 dark:text-neutral-300"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch({ type: 'item-removed', payload: item.id })}
                  className="ml-1 text-neutral-400 hover:text-red-500"
                  aria-label={`${item.name}ni o'chirish`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3 text-sm font-medium text-neutral-900 dark:border-neutral-800 dark:text-neutral-100">
        <span>Jami</span>
        <span>${subtotal}</span>
      </div>

      {items.length > 0 && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => dispatch({ type: 'cart-cleared' })}
            className="flex-1 rounded-lg bg-neutral-100 py-2 text-sm text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            Tozalash
          </button>
          <button
            onClick={onCheckout}
            className="flex-1 rounded-lg bg-violet-600 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Buyurtma berish
          </button>
        </div>
      )}
    </aside>
  )
}

export default Cart
