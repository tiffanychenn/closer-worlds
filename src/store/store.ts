import { rootReducer, initialState } from '../reducers/rootReducer';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const middleware = [thunk];

export const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
);

export type AppDispatch = typeof store.dispatch;
