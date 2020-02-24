import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Counter from './Counter';

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


describe('Counter Component', () => {
  it('should display counter component', () => {
    const { component } = setup(1);

    expect(component.text()).toMatch("Clicked: 1 times + - Increment if odd Increment async");
  });

});




