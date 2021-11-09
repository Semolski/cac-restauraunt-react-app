import CommentsActionTypes from "./comments.types";

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch(action.type) {
        case CommentsActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};

        case CommentsActionTypes.FETCH_COMMENTS_FAILURE:
            return {...state, isLoading: false, errMess: action.payload, comments: []};

        case CommentsActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
}