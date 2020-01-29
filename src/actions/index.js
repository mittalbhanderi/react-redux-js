import { CALL_API, Schemas } from '../middleware/api'
import * as ActionTypes from '../Constants'


// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUser = login => ({
  [CALL_API]: {
    types: [ActionTypes.USER_REQUEST, ActionTypes.USER_SUCCESS, ActionTypes.USER_FAILURE],
    endpoint: `users/${login}`,
    schema: Schemas.USER
  }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
// Thunk are higher order functions the give you control over when and how often the actions are dispatched.
// These are usually specified as the middle step to dispatch action(s) after completing async call..

export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login]
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchUser(login))
}


// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = fullName => ({
  [CALL_API]: {
    types: [ActionTypes.REPO_REQUEST, ActionTypes.REPO_SUCCESS, ActionTypes.REPO_FAILURE],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO
  }
})

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName]
  if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchRepo(fullName))
}


// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [ActionTypes.STARRED_REQUEST, ActionTypes.STARRED_SUCCESS, ActionTypes.STARRED_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY
  }
})

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0
  } = getState().pagination.starredByUser[login] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchStarred(login, nextPageUrl))
}


// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [ActionTypes.STARGAZERS_REQUEST, ActionTypes.STARGAZERS_SUCCESS, ActionTypes.STARGAZERS_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${fullName}/stargazers`,
    pageCount = 0
  } = getState().pagination.stargazersByRepo[fullName] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchStargazers(fullName, nextPageUrl))
}





// export const POSTS_REQUEST = 'POSTS_REQUEST'
// export const POSTS_SUCCESS = 'POSTS_SUCCESS'
// export const POSTS_FAILURE = 'POSTS_FAILURE'

// // Fetches a single POSTS from Github API.
// // Relies on the custom API middleware defined in ../middleware/api.js.
// const fetchPOSTS = selectedType => ({
//   [CALL_API]: {
//     types: [ POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE ],
//     endpoint: `POSTSs/${selectedType}`,
//     schema: Schemas.POSTS
//   }
// })

// // Fetches a single POSTS from Github API unless it is cached.
// // Relies on Redux Thunk middleware.
// export const loadPOSTS = (selectedType, requiredFields = []) => (dispatch, getState) => {
//   const POSTS = getState().entities.POSTSs[selectedType]
//   if (POSTS && requiredFields.every(key => POSTS.hasOwnProperty(key))) {
//     return null
//   }

//   return dispatch(fetchPOSTS(selectedType))
// }



export const selectSubreddit = selectedType => ({
  type: ActionTypes.SELECTED_TYPE,
  selectedType
})

export const invalidateSubreddit = selectedType => ({
  type: ActionTypes.CLEAR_SELECTED_TYPE,
  selectedType
})

export const requestPosts = selectedType => ({
  type: ActionTypes.REQUEST_POSTS,
  selectedType
})

export const receivePosts = (selectedType, json) => ({
  type: ActionTypes.RECEIVE_POSTS,
  selectedType,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

// exmple of thunk
const fetchPosts = selectedType => dispatch => {
  dispatch(requestPosts(selectedType))
  return fetch(`https://www.reddit.com/r/${selectedType}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(selectedType, json)))
}

const shouldFetchPosts = (state, selectedType) => {
  const posts = state.postsByType[selectedType]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}
// another example of thunk
// action with certain side effects 
export const fetchPostsIfNeeded = selectedType => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), selectedType)) {
    return dispatch(fetchPosts(selectedType))
  }
}


// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: ActionTypes.RESET_ERROR_MESSAGE
})



export const incrementCounter = () => ({
  type: ActionTypes.INCREMENT_COUNTER
})

export const decrementCounter = () => ({
  type: ActionTypes.DECREMENT_COUNTER
})

export const incrementAsyncCounter = () => dispatch => {
  debugger;
  setTimeout(() => { dispatch(incrementCounter()) }, 3000)
}

const addToCartUnsafe = productId => ({
  type: ActionTypes.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.allProducts[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}