import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';

// To make use of this reducer function, go into the MainComponent.js
// it will have to be mapped to dispatch to props.

// This is where the action will be recieved and acted upon
// The other ones, dishes, leaders, promotions, don't need to take
// any action when the action is recieved. They just ignore the
// type.

// If the type property matches that of the action,
// then this reducer function should do something to the state.
// In this case when it recieves the comment,
export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        // the comments are a JS array, the length tells how many
            // comments there are. Then the comments will be assigned
            // a comment id in sequential order, so the next comment
            // that goes in should get the comment id because the comment
            // starts at 0
            // Remember: we cannot modify a state that has been sent in as a
            // parameter. It can be added to, and then the modified version
            // can be returned. But I cannot directly mutate the state.
            // that is why I use state.concat() because it will create an
            // object that can be returned by the reducer function.
            // Note: The comments are ONLY being added to memory at this time.
            // if the app is restarted, the added comment will be gone.
        comment.id = state.length;
        comment.date = new Date().toISOString();
        return state.concat(comment);
        default:
            return state;
    }
}