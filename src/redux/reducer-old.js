import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';


// This is the initial configuration for the state.
export const initialState ={
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

// Reducer is a pure function. It just returns the state.
// It will call the current state and the action.
// The state cannot be modified directly.
// There can only be an immutable change and then return in
// an updated version of the state from the Reducer.
// We must set up the Reducer function because the Store
// needs to know what to do when an action is dispatched to it.

// Using the ES6 way of specifying a default value for the parameter. (state = initialState)
// When the Reducer is called initially, the state will not be initialized.
// When the application starts the app should initialize the initial state (initialState)
// Now when the Reducer is first called by my Store, it will be empty, but defining the initial state,
// set the default value.
export const Reducer = (state = initialState, action) => {
    return state;
};