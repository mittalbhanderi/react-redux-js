import * as ActionTypes from '../Constants'

export const increment = (nodeId) => ({
    type: ActionTypes.INCREMENT_NODE_COUNTER,
    nodeId
  })
  
  let nextId = 0
  export const createNode = () => ({
    type: ActionTypes.CREATE_NODE,
    nodeId: `new_${nextId++}`
  })
  
  export const deleteNode = (nodeId) => ({
    type: ActionTypes.DELETE_NODE,
    nodeId
  })
  
  export const addChild = (nodeId, childId) => ({
    type: ActionTypes.ADD_CHILD_NODE,
    nodeId,
    childId
  })
  
  export const removeChild = (nodeId, childId) => ({
    type: ActionTypes.REMOVE_CHILD_NODE,
    nodeId,
    childId
  })