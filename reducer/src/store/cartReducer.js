const initialCartState = { items: [] }

export function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case 'item-added': {
      const existing = state.items.find((item) => item.id === action.payload.id)

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        }
      }

      return { items: [...state.items, { ...action.payload, qty: 1 }] }
    }

    case 'qty-incremented': {
      return {
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item,
        ),
      }
    }

    case 'qty-decremented': {
      return {
        items: state.items.flatMap((item) => {
          if (item.id !== action.payload) return [item]
          if (item.qty <= 1) return []
          return [{ ...item, qty: item.qty - 1 }]
        }),
      }
    }

    case 'item-removed': {
      return { items: state.items.filter((item) => item.id !== action.payload) }
    }

    case 'cart-cleared': {
      return { items: [] }
    }

    default:
      return state
  }
}
