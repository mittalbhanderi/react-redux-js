import * as ActionTypes from '../Constants'

const childNodeIds = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CHILD_NODE:
            return [ ...state, action.childId ]

        case ActionTypes.REMOVE_CHILD_NODE:
            return state.filter(id => id !== action.childId)

        default:
            return state
    }
}

const node = (state, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_NODE:
            return {
                nodeId: action.nodeId,
                counter: 0,
                childNodeIds: []
            }
        case ActionTypes.INCREMENT_NODE_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            }
        case ActionTypes.ADD_CHILD_NODE:
        case ActionTypes.REMOVE_CHILD_NODE:
            return {
                ...state,
                childNodeIds: childNodeIds(state.childNodeIds, action)
            }
        default:
            return state
    }
}

const getAllDescendantIds = (state, nodeId) => (
    state[nodeId].childNodeIds.reduce((acc, childId) => (
        [...acc, childId, ...getAllDescendantIds(state, childId)]
    ), [])
)

const deleteMany = (state, Ids) => {
    state = { ...state }
    Ids.forEach(id => delete state[id])
    return state
}

export default (state = {}, action) => {    
    const { nodeId } = action
    
    if (typeof nodeId === 'undefined') {
        return state
    }

    if (action.type === ActionTypes.DELETE_NODE) {
        const descendantIds = getAllDescendantIds(state, nodeId)
        return deleteMany(state, [nodeId, ...descendantIds])
    }
    
    return {
        ...state,
        [nodeId]: node(state[nodeId], action)
    }
}