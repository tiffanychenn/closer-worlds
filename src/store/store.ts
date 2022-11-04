import { rootReducer, initialState, State, Actions } from '../reducers/rootReducer';

import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

const middleware = [thunk];

export const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
);

export type AppDispatch = typeof store.dispatch;
