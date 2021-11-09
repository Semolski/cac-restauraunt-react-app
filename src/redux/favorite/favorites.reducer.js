import FavoritesActionTypes from "./favorites.types";

export const Favorites = (state = {
    isLoading: true,
    errMess: null,
    favorites: null
}, action) => {
    switch(action.type) {
        case FavoritesActionTypes.FETCH_ADD_FAVORITES:
            return {...state, isLoading: false, errMess: null, favorites: action.payload};

        case FavoritesActionTypes.FETCH_FAVORITES_START:
            return {...state, isLoading: true, errMess: null, favorites: null};

        case FavoritesActionTypes.FETCH_FAVORITES_FAILURE:
            return {...state, isLoading: false, errMess: action.payload, favorites: null};

        default:
            return state;
    }
}