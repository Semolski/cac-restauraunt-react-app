import DishesActionTypes from "./dishes.types";

export const Dishes = (state = {
        isLoading: true,
        errMess: null,
        dishes: []
    }, action) => {
    switch(action.type) {
        case DishesActionTypes.FETCH_DISHES_START:
            return {...state, isLoading: false, errMess: null, dishes: action.payload}
        case DishesActionTypes.FETCH_DISHES_SUCCESS:
            return {...state, isLoading: true, errMess: null, dishes: [] }
        case DishesActionTypes.FETCH_DISHES_FAILURE:
            return {...state, isLoading: false, errMess: action.payload, dishes: [] }
        default:
        return state;
    }
}