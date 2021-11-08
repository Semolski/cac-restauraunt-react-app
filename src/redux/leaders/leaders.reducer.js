import LeadersActionTypes from "./leaders.types";

export const Leaders = (state  = { isLoading: true,
    errMess: null,
    leaders:[]}, action) => {
    switch (action.type) {
        case LeadersActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case LeadersActionTypes.FETCH_LEADERS_START:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case LeadersActionTypes.FETCH_LEADERS_FAILURE:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};