import * as ActionTypes from './ActionTypes';
import {DISHES} from '../shared/dishes';
import { baseUrl} from "../shared/baseUrl";

// addComment is a function that creates an action object
// These 4 parameters will be mapped inside the payload object
// Now the action objet is ready to be returned by the action creator
// This is the standardized way to define an action type.
// Next it will be sent to the Store.

//
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
// This will add a POST operation to the server.
// addComment above will now be used to push the comments
// into the Redux store.
// Doing this also means that the reducer must be updated.
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    // To import we will create a new JS object and then
    // map in the parameters.
        const newComment = {
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        };
        newComment.date = new Date().toISOString();
        // fetch operation
        // It will take the JS object and turn it into JSON,
        // then put it into the body of the message
        return fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(response => {
                    if(response.ok){
                        return response;
                    }
                    // Generrate a new error object
                    else {
                        var error = new Error('Error' + response.status +
                            response.statusText);
                        error.response = response;
                        throw error;
                    }
                }, // error handler from when you don't hear ack from server.
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(response => dispatch(addComment(response)))
            // The response coming in from the server will post
            // the new comment. When the comment is posted into
            // the server it will be given an id and then send
            // back the updated comment.
            .catch(error => { console.log('Post comments', error.message)
                alert('Your comment could not be posted\nError: '+ error.message); })
}


// This export will be created as a thunk which is why we see
// () a function there. The function will be returned by this function
// (dispatch) =>
// The inner function gets access to the dispatch and
// get state if required.
export const fetchDishes = () => (dispatch) => {
    // This is the inner function.
    dispatch(dishesLoading(true));

    // This will fetch the dishes and once they are obtained
    // then they are pushed into the Redux Store.
    // This has been updated to handle errors
    // the response could either be sending back the data or an
    // error response from the server.
    // promises can be chained together.
    // Once one promise is fufilled it will move on
    // to the next.
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }
            // Generrate a new error object
            else {
                var error = new Error('Error' + response.status +
                response.statusText);
                error.response = response;
                throw error;
            }
        }, // error handler from when you don't hear ack from server.
            error => {
             var errmess = new Error(error.message);
             throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
    // setTimeout is introducing a delay. But it will be replaced with
    // an asyncronous call to a server.
    // the setTimeout will supply a function with a delay
    // after the 2000ms delay, a call to another function will be
    // dispatched called addDishes with the DISHES that have been imported.
    // // This will push the dishes into the state of the Store.
    // This was originally put in place to simulate communication with
    // the server.
    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));
    // }, 2000);
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

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if(response.ok){
                    return response;
                }
                // Generrate a new error object
                else {
                    var error = new Error('Error' + response.status +
                        response.statusText);
                    error.response = response;
                    throw error;
                }
            }, // error handler from when you don't hear ack from server.
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        // When comments are obtained, they will be dispatched to
        // a function called addComments
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));

}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
        return fetch(baseUrl + 'promotions')
            .then(response => {
                    if(response.ok){
                        return response;
                    }
                    // Generrate a new error object
                    else {
                        var error = new Error('Error' + response.status +
                            response.statusText);
                        error.response = response;
                        throw error;
                    }
                }, // error handler from when you don't hear ack from server.
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(promos => dispatch(addPromos(promos)))
            .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
