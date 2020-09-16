export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';

export const DISHES_LOADING = 'DISHES_LOADING';
export const DISHES_FAILED = 'DISHES_FAILED';
export const ADD_DISHES = 'ADD_DISHES';

export const PROMOS_LOADING = 'PROMOS_LOADING';
export const ADD_PROMOS = 'ADD_PROMOS';
export const PROMOS_FAILED = 'PROMOS_FAILED';

export const LEADERS_LOADING = 'LEADERS_LOADING';
export const LEADERS_FAILED= 'LEADERS_FAILED';
export const ADD_LEADERS = 'ADD_LEADERS';

export const ADD_FEEDBACK = 'ADD_FEEDBACK';

// the DISHES_LOADING means that the dishes are currently being
// fetched from a server. DISHES_FAILED means it failed to fetch
// the dishes from the server. ADD_DISHES means we want to add the
// dishes to the Store.

// There isn't a COMMENTS_LOADING because the comments is loaded behind
// scenes when we render our application. First we will render the home
// component. By the time that is rendered, the comments will also be fetched in
// So by the time we navigate to DishDetail comments, they will already be
// loaded.