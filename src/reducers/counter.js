import * as ActionTypes from '../Constants'

const counter = (state = 0, action) => {
    switch(action.type) {
        case ActionTypes.INCREMENT_COUNTER:            
            return state + 1;
            
        case ActionTypes.DECREMENT_COUNTER:
            return state - 1;

        default: 
            return state;
    }
}

export default counter;