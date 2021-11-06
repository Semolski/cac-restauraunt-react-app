import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes/dishes.reducer';
import { Comments } from './comments/comments.reducer';
import { Promotions } from './promos/promotions.reducer';
import { Leaders } from './leaders/leaders.reducer';
import { favorites } from './favorite/favorites.reducer';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './contact/contact.reducer';

export const Store = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            favorites,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}