function ProductList({ products, categories, query, category, onQueryChange, onCategoryChange, onAdd }) {
  return (
    <section className="text-left">
      <input
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Mahsulot qidirish..."
        className="mb-3 w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 outline-none focus:border-violet-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => onCategoryChange(item)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              category === item
                ? 'border-violet-500 bg-violet-600 text-white'
                : 'border-neutral-200 text-neutral-600 hover:border-violet-300 dark:border-neutral-700 dark:text-neutral-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onAdd(product)}
            title={product.features ? product.features.join(', ') : undefined}
            className="flex flex-col items-center gap-1 rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-violet-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
            ) : (
              <span className="text-3xl">{product.emoji}</span>
            )}
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {product.name}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              ${product.price}
            </span>
            {product.features && (
              <ul className="mt-1 flex flex-col gap-0.5 text-[10px] leading-tight text-neutral-400 dark:text-neutral-500">
                {product.features.slice(0, 2).map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            )}
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
