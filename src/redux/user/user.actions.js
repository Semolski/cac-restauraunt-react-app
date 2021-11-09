import UserActionTypes from "./user.types";
import {favoritesFailed, fetchFavorites} from "../favorite/favorites.actions";

export const requestLogin = (creds) => {
    return {
        type: UserActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: UserActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: UserActionTypes.LOGIN_FAILURE,
        message
    }
}

export const requestLogout = () => {
    return {
        type: UserActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: UserActionTypes.LOGOUT_SUCCESS
    }
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};



// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}
