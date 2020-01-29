import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import App from './App'
import Explore from '../components/Explore'

const setup = _propsOverride => {

    const props = Object.assign({
        errorMessage: "", 
        resetErrorMessage: jest.fn(),
        inputValue: "",
        children: {},
        actions:  {
            resetErrorMessage
        }
    }, _propsOverride)
    const renderer = createRenderer()
    renderer.render(<App />)
    const output = renderer.getRenderOutput()
    return output
}

describe('App Component', () => {
    describe('Explore', () => {
        it('should render', () => {

        })
    })
})