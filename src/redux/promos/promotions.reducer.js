import PromotionsActionTypes from "./promotions.types";

export const Promotions = (state = {
    isLoading: true,
    errMess: null,
    promotions: []
}, action) => {
    switch(action.type) {
        case PromotionsActionTypes.FETCH_PROMOS_SUCCESS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case PromotionsActionTypes.FETCH_PROMOS_START:
            return {...state, isLoading: true, errMess: null, promotions: []};

        case PromotionsActionTypes.FETCH_PROMOS_FAILURE:
            return {...state, isLoading: false, errMess: action.payload, promotions: []};

        default:
            return state;
    }
}