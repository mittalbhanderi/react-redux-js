import shop from "../middleware/shop"
import * as ActionTypes from '../Constants'

const productsReceived =(products) => ({
    type: ActionTypes.RECEIVE_PRODUCTS,
    products
})

export const getAllProducts = () => dispatch => {
    shop.getProducts(products => {
        dispatch(productsReceived(products))
    })
}


export const checkout = products => (dispatch, getState) => {
    const { cart } = getState()
  
    dispatch({
      type: ActionTypes.CHECKOUT_REQUEST
    })
    
    shop.buyProducts(products, () => {
      dispatch({
        type: ActionTypes.CHECKOUT_SUCCESS,
        cart
      })
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.CHECKOUT_FAILURE, cart })
    })
  }