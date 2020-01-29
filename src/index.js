import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import generateTree from './Constants/generateTree'

const tree = generateTree()

const store = configureStore(
  {
    nodes: {...tree}
  })

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)
