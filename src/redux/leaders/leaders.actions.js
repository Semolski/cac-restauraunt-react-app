import {baseUrl} from "../../shared/baseUrl";
import LeadersActionTypes from "./leaders.types";

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
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
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: LeadersActionTypes.FETCH_LEADERS_START
});

export const leadersFailed = (errmess) => ({
    type: LeadersActionTypes.FETCH_LEADERS_FAILURE,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: LeadersActionTypes.ADD_LEADERS,
    payload: leaders
});