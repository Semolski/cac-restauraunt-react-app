import {baseUrl} from "../../shared/baseUrl";
import DishesActionTypes from "./dishes.types";

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: DishesActionTypes.FETCH_DISHES_START
});

export const dishesFailed = (errmess) => ({
    type: DishesActionTypes.FETCH_DISHES_FAILURE,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: DishesActionTypes.FETCH_DISHES_SUCCESS,
    payload: dishes
});