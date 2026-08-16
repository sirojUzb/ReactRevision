import products from '../products'

const initialProductsState = {
  items: products,
  query: '',
  category: 'Hammasi',
}

export function productsReducer(state = initialProductsState, action) {
  switch (action.type) {
    case 'query-changed':
      return { ...state, query: action.payload }

    case 'category-changed':
      return { ...state, category: action.payload }

    default:
      return state
  }
}

export function selectFilteredProducts(state) {
  return state.items.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(state.query.toLowerCase())
    const matchesCategory = state.category === 'Hammasi' || product.category === state.category
    return matchesQuery && matchesCategory
  })
}

export function selectCategories(state) {
  return ['Hammasi', ...new Set(state.items.map((product) => product.category))]
}
