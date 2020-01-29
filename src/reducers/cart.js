import * as ActionTypes from '../Constants'
  
  const initialState = {
    addedProductIds: [],
    addedProductQuantity: {}
  }
  
  const addedProductIds = (state = initialState.addedProductIds, action) => {
    switch (action.type) {
      case ActionTypes.ADD_TO_CART:
        if (state.indexOf(action.productId) !== -1) {
          return state
        }
        return [ ...state, action.productId ]
      default:
        return state
    }
  }
  
  const addedProductQuantity = (state = initialState.addedProductQuantity, action) => {
    switch (action.type) {
      case ActionTypes.ADD_TO_CART:
        const { productId } = action
        return { ...state,
          [productId]: (state[productId] || 0) + 1
        }
      default:
        return state
    }
  }
  
  export const getQuantity = (state, productId) =>
    state.addedProductQuantity[productId] || 0
  
  export const getaddedProductIds = state => state.addedProductIds
  
  const cart = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.CHECKOUT_REQUEST:
        return initialState
      case ActionTypes.CHECKOUT_FAILURE:
        return action.cart
      default:
        return {
          addedProductIds: addedProductIds(state.addedProductIds, action),
          addedProductQuantity: addedProductQuantity(state.addedProductQuantity, action)
        }
    }
  }
  
  export default cart
  