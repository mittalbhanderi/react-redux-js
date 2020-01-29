import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/tree-view'

export class NodeContainer extends Component {
  handleIncrementClick = () => {
    const { increment, id } = this.props
    increment(id)
  }

  handleAddChildClick = e => {
    e.preventDefault()
    const { addChild, createNode, id } = this.props
    const childId = createNode().nodeId
    addChild(id, childId)
  }

  handleRemoveClick = e => {
    e.preventDefault()

    const { removeChild, deleteNode, parentId, id } = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  renderChild = childId => {
    const { id } = this.props
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    )
  }

  render() {
    const { counter, parentId, childNodeIds } = this.props
    return (
      <div>
        Counter: {counter}
        {' '}
        <button onClick={this.handleIncrementClick}>
          +
            </button>
        {' '}
        {typeof parentId !== 'undefined' &&
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/anchor-is-valid
            style={{ color: 'lightgray', textDecoration: 'none' }}>
            XXXX
              </a>
        }
          <ul>
            {childNodeIds.map(this.renderChild)}
            <li key="add">
              <a href="#" // eslint-disable-line jsx-a11y/anchor-is-valid
                onClick={this.handleAddChildClick}
              >Add child</a>
            </li>
          </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.nodes[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(NodeContainer)
export default ConnectedNode