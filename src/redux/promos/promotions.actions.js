import PromotionsActionTypes from './promotions.types';

export const promosLoading = () => ({
    type: PromotionsActionTypes.FETCH_PROMOS_START
});

export const promosFailed = (errmess) => ({
    type: PromotionsActionTypes.FETCH_PROMOS_SUCCESS,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: PromotionsActionTypes.FETCH_PROMOS_FAILURE,
    payload: promos
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
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
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}