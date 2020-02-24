import deepFreeze from 'deep-freeze'
import reducer from './tree-view'
import { increment, createNode, deleteNode, addChild, removeChild } from '../actions/tree-view'

describe('tree-view reducer', () => {

    it('shoud provide the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle increment action', () => {
        const stateBefore = {
            'node_0': {
                nodeId: 'node_0',
                counter: 0,
                childNodeIds: []
            }
        }

        const action = increment('node_0')

        const stateAfter = {
            'node_0': {
                nodeId: 'node_0',
                counter: 1,
                childNodeIds: []
            }
        }

        deepFreeze(stateBefore)
        deepFreeze(action)


        expect(reducer(stateBefore, action)).toEqual((stateAfter))
    })

    it('Should handle CREATE_NODE action', () => {
        const stateBefore = {}
        const action = createNode()

        const stateAfter = {
            [action.nodeId]: {
                nodeId: action.nodeId,
                counter: 0,
                childNodeIds: []
            }
        }

        deepFreeze(stateBefore)
        deepFreeze(action)

        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })


})
