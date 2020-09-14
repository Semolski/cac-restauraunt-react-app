import * as ActionTypes from "./ActionTypes";

// We no longer need this line here because the comments will be
// fetched from the server.
// import {PROMOTIONS} from '../shared/promotions';

// The state shape has to be changed just like with Dishes
export const Promotions = (state = {
        isLoading: true,
        errMess: null,
        promotions: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

       case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []};

        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
}