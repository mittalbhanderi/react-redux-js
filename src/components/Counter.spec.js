import React from 'react';
import renderer from 'react-test-renderer';
import Counter from './Counter';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function setup(counter) {

  const component = shallow(
    <Counter value={counter} onIncrement={jest.fn()}
      onDecrement={jest.fn()}
      onAsyncIncrement={jest.fn()} />
  )

  return {
    component: component,
    addButton: component.findWhere(n => n.type() === 'button' && n.contains('+')),
    negateButton: component.findWhere(n => n.type() === 'button' && n.contains('-'))
  }
}

test('Counter component snapshot', () => {
  const component = renderer.create(
    <Counter
      value={0}
      onIncrement={jest.fn()}
      onDecrement={jest.fn()}
      onAsyncIncrement={jest.fn()}></Counter>,
  );

  let tree = component.toJSON();
  tree.props.incrementIfOdd = jest.fn();
  expect(tree).toMatchSnapshot();

});


// describe('Counter Component', () => {
//   it('should display counter component', () => {
//     const { component } = setup(1);

//     expect(component.text()).toMatch("Clicked: 1 times + - Increment if odd Increment async");
//   });

//});




