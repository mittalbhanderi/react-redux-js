import React from 'react'
import { shallow } from 'enzyme'
import ConnectedNode, { NodeContainer } from './Node'

function setup(id, counter, childNodeIds, parentId) {
    const actions =  {
        increment: jest.fn(), 
        removeChild: jest.fn(),
        deleteNode: jest.fn(), 
        createNode: jest.fn(),
        addChild: jest.fn()
    }

    const eventArgs = {
        preventDefault: jest.fn()
    }

    const component = shallow(
        <NodeContainer id={id} counter={counter} parentId={parentId} childNodeIds={childNodeIds} {...actions} />
    )

    return {
        component: component,
        removeLink: component.findWhere(n => n.type() === 'a' && n.contains('XXXX')),
        addLink: component.findWhere(n => n.type() === 'a' && n.contains('Add child')),
        button: component.find('button'),
        childNodes: component.find(ConnectedNode),
        actions: actions,
        eventArgs: eventArgs
    }
}

describe('Node Container Component Tests', () => {

    it('should display counter', () => {
        const { component } = setup(1, 23, [])
        expect(component.text()).toMatch(/^Counter: 23/)
    })

    it('should call increment button', () => {
        const { button, actions } = setup(1,2, [])
        button.simulate('click')

        expect(actions.increment).toBeCalledWith(1)
    })

    it('should not render remove link', () => {
        const { removeLink } = setup(1, 2, [])
        expect(removeLink.length).toEqual(0)
    })

    it('should call createNode action on Add child click', () => {
        const { addLink, actions, eventArgs } = setup(2, 1, ['node_0'])
        actions.createNode.mockReturnValue({ nodeId: 3 })

        addLink.simulate('click', eventArgs)

        expect(actions.createNode).toBeCalled()
    })

    it('should call deleteNode action on Remove click', () => {
        const { removeLink, actions, eventArgs } = setup(2, 1, [3,4], 2)
        
        removeLink.simulate('click', eventArgs)

        expect(actions.removeChild).toBeCalled()

    })


})