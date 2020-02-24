import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

class Counter extends PureComponent {

constructor(props) {
  super(props);
  this.incrementIfOdd = this.incrementIfOdd.bind(this);
}

  static propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onAsyncIncrement: PropTypes.func.isRequired
  }

  incrementIfOdd(){
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  render() {
    const { value, onIncrement, onAsyncIncrement, onDecrement } = this.props
    return (
      <div>
        Clicked: {value} times
              {' '}
        <button onClick={onIncrement}>
          +
              </button>
        {' '}
        <button onClick={onDecrement}>
          -
              </button>
        {' '}
        <button onClick={this.incrementIfOdd}>
          Increment if odd
              </button>
        {' '}
        <button onClick={onAsyncIncrement}>
          Increment async
              </button>
      </div>
    )
  }
}

export default Counter