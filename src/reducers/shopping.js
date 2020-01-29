import * as ActionTypes from '../Constants'
import { combineReducers } from 'redux'

const products = (state, action) => {
    switch(action.type) {
        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                inventory: state.inventory - 1
            }
        default:
            return state
    }
}

export const allProducts = (state = {}, action) => {
    switch(action.type) {
        case ActionTypes.RECEIVE_PRODUCTS:
            return {
                ...state, 
                ...action.products.reduce((obj, product) => {
                    obj[product.id] = product
                    return obj
                }, {})
            }
        default:
            const { productId } = action
            if (productId) {
                return {
                    ...state,
                    [productId]: products(state[productId], action)
                }
            }
            return state
    }
}

export const availableProducts = (state=[], action) => 
{
    switch(action.type) {
        case ActionTypes.RECEIVE_PRODUCTS: 
            return action.products.map(product => product.id)
        default:
            return state
    }
}

// export default combineReducers({
//     allProducts, 
//     availableProducts
// }) 

export const getProduct = (state, id) =>
  state.allProducts[id]

export const getVisibleProducts = state =>
  state.availableProducts.map(id => getProduct(state, id))