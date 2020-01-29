import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route } from 'react-router-dom'
import App from './App'
import UserPage from './UserPage'
import RepoPage from './RepoPage'
import CounterPage from './CounterPage'
import AsyncPage from './AsyncPage'
import ShoppingCart from './ShoppingCart'
import NodeContainer from './NodeContainer'
import Autocomplete from './Autocomplete'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/" exact={true} component={App} />
      <Route path="/counter" exact={true}
              component={CounterPage} />
      <Route path="/async" exact={true}
              component={AsyncPage} />
      <Route path="/shopping" exact={true}
              component={ShoppingCart} />
      <Route path="/tree-view" exact={true}
              component={NodeContainer} />
      <Route path="/auto-complete" exact={true}
              component={Autocomplete} />
      {/* <Route path="/:login/:name"
             component={RepoPage} />
      <Route path="/:login"
             component={UserPage} /> */}
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
