import { createStore, combineReducers, applyMiddleware } from "redux";
import {createForms} from 'react-redux-form';
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Dishes } from "./dishes";
import { Promotions } from "./promotions";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialFeedback} from './forms'

// This creates the Redux store.
// The whole purpose for this function is so that the store can be called.
// This does not have to be in a separate file, it can be in Reducer.js,
// but doing it this way makes it more convienient and organized.

// To combine these 4 together, redux provides a method called combineReducers
// To compose the overall global state, you have to map the reducers into
// each one of the four properties.
// Here the global state has been composed.

// applyMiddleware(thunk, logger) ... both thunk and logger are being
// applied to the Store as enhancers for the Store. Now they are available
// within the application.
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers ({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
                ...createForms({
                    feedback: InitialFeedback
                })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};