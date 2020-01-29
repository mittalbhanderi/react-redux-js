
import React from 'react'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import { withRouter } from 'react-router-dom'
import { incrementCounter, decrementCounter, incrementAsyncCounter} from '../actions'
import PropTypes from 'prop-types'

const CounterPage = (props) => (
        <Counter 
            value={props.counter}
            onIncrement={() => props.dispatch(incrementCounter())}
            onDecrement={() => props.dispatch(decrementCounter())} 
            onAsyncIncrement={() => props.dispatch(incrementAsyncCounter())}
        />
            
)

CounterPage.propTypes =  {
    counter: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    const { counter } = state  
    return {
        counter
    }
}

export default withRouter(connect(mapStateToProps)(CounterPage)) 
