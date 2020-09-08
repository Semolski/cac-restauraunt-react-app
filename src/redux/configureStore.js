import { createStore } from "redux";
import { Reducer, initialState } from "./reducer";

// This creates the Redux store.
// The whole purpose for this function is so that the store can be called.
// This does not have to be in a separate file, it can be in Reducer.js,
// but doing it this way makes it more convienient and organized.

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );

    return store;
};