function ProductList({ products, query, onQueryChange, onAdd }) {
  return (
    <section className="text-left">
      <input
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Mahsulot qidirish..."
        className="mb-4 w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 outline-none focus:border-violet-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onAdd(product)}
            className="flex flex-col items-center gap-1 rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-violet-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span className="text-3xl">{product.emoji}</span>
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {product.name}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              ${product.price}
            </span>
          </button>
        ))}

        {products.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-neutral-400">
            Hech narsa topilmadi
          </p>
        )}
      </div>
    </section>
  )
}

export default ProductList
