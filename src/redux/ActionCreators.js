import * as ActionTypes from './ActionTypes';
import {DISHES} from '../shared/dishes';


// addComment is a function that creates an action object
// These 4 parameters will be mapped inside the payload object
// Now the action objet is ready to be returned by the action creator
// This is the standardized way to define an action type.
// Next it will be sent to the Store.

//
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

// This export will be created as a thunk which is why we see
// () a function there. The function will be returned by this function
// (dispatch) =>
// The inner function gets access to the dispatch and
// get state if required.
export const fetchDishes = () => (dispatch) => {
    // This is the inner function.
    dispatch(dishesLoading(true));

    // setTimeout is introducing a delay. But it will be replaced with
    // an asyncronous call to a server.
    // the setTimeout will supply a function with a delay
    // after the 2000ms delay, a call to another function will be
    // dispatched called addDishes with the DISHES that have been imported.
    // This will push the dishes into the state of the Store.
    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}

// This is a function () which returns an action
// it will not return any data, only a type.
// Based on how we implement the action reducer, that will
// determine what this action is going to do.
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

// This new function () will take error messages as a parameter (errmess)
// This function will return action objects.
// errmess will be a string, but the implementation here
// doesn't tell what the error message is. Whatever we pass into
// the dishesFailed object that will be delivered as a payload
// to the dishes reducer. So we will make use of it there.
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

// addDishes will be a function that takes all the dishes as a
// parameter so it must be creating an action.
// This function returns an action of the type
// ADD.DISHES
// it will pass the dishes as the payload.
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// Now all the four differen  action creator functions
// are set up. 3 of them are returning an action object.
// The 4th one is a thunk that is returning a function
// that is going to dispatch several actions.
//
// Next the three different action types need to be interpreted.
// They are going to effected only the dishes part of the state
// of the application so, the actions should only be in
// dishes.js