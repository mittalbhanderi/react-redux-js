import * as ActionTypes from '../Constants'
import merge from 'lodash/merge'
import paginate from './paginate'
import { combineReducers } from 'redux'
import counter  from './counter'
import  * as fromProducts from './shopping'
import cart, * as fromCart from './cart'
import nodes from './tree-view'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
})

const selectedType = (state = 'reactjs', action) => {
  switch (action.type) {
    case ActionTypes.SELECTED_TYPE:
      return action.selectedType
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_SELECTED_TYPE:
      return {
        ...state,
        didInvalidate: true
      }
    case ActionTypes.REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case ActionTypes.RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByType = (state = { }, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_SELECTED_TYPE:
    case ActionTypes.RECEIVE_POSTS:
    case ActionTypes.REQUEST_POSTS:
      return {
        ...state,
        [action.selectedType]: posts(state[action.selectedType], action)
      }
    default:
      return state
  }
}



const getaddedProductIds = state => fromCart.getaddedProductIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getTotal = state =>
  getaddedProductIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

export const getCartProducts = state =>
  getaddedProductIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))

  const products = combineReducers({
    allProducts: fromProducts.allProducts,
    availableProducts: fromProducts.availableProducts
  });

  const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  counter,
  postsByType,
  selectedType,
  products,
  cart,
  nodes,
})

export default rootReducer
