// import {DISHES} from '../shared/dishes';
// We no longer need this import because we will make the
// responsibility of the import to be with the ActionCreator
// to supply that information.
import * as ActionTypes from './ActionTypes';

// The switch statement will allow us to switch between the
// three different action types.
// The three different actions must be interpretted by this
// reducer function. It must do something in response to these
// three actions.
// export const Dishes = (state = DISHES, action) =>
// THe state will be changed from above to have three different
// parameters.
//
// Now the state has been extended to contain three properties.
// The moment that dishes are loaded isLoading should be set to false.
// because the dishes will be loaded in. And if it was set to false
// it will be set to true, meaning we are beginning to fetch new dishes.
// So whenever the dish information is fetched from the server,
// you can set the isLoading to true, and once the dishes information
// is obtained from the server, isLoading will be set to false...
// and then load in the dishes into the dishes property ... dishes: []
//
// Looking at this structure, it will be the same structure used for the promotions,
// leaders and comments.
export const Dishes = (state = {
        isLoading: true,
        errMess: null,
        dishes: []
    }, action) => {
    switch(action.type) {
        // When ADD_DISHES is passed into this reducer, then whatever is passed in in the
            // payload of the action object, that will be set equal to the dishes.
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload }

        // When we recieve an action of the type DISHES_LOADING,
            // we will return: first taking the current value of the state
            // and whatever is added in after the comma will be applied as
            // modifications to the state. Essentially a new object is created
            // from the current state, and after the comma shows what will be done
            // to the object. It is returning an immutable. The state itself
            // will not be mutated here.
            // We must set isLoading: true, errMess: null, dishes: []
            // because we may be refreshing the information from the server
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: [] }

            // If the dishes fail to load, then the payload will contain the
            // error message. By doing this when the state is set like this,
            // when the react component retrieves this state, it can then interpret
            // this information accordingly and then display this information in the
            // view as per what the state contains.
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes: [] }
        default:
        return state;
    }
}