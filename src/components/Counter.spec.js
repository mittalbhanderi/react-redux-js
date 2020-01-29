import React from 'react'
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import Counter from './Counter'
import { act } from 'react-dom/test-utils';


let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


function setup(counter) {
    // const actions = {
    //     incrementCounter: jest.fn(),
    //     decrementCounter: jest.fn(),
    //     incrementAsyncCounter: jest.fn()
    // }

    const component = shallow(
        <Counter value={counter}  onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onAsyncIncrement={jest.fn()} />
    )

    return {
        component: component,
        addButton: component.findWhere(n => n.type() === 'button' && n.contains('+')),
        negateButton: component.findWhere(n => n.type() === 'button' && n.contains('-'))
    }
}

describe('Counter Component', () => {
    it('should display counter component',  ()=>{
        const { component } = setup(1)

        expect(component.text()).toMatch("Clicked: 1 times + - Increment if odd Increment async")
    })
})


it('can render and update a counter', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // Test second render and componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
}); 
