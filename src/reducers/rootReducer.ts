import { Action, combineReducers, Reducer } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export interface State {
	// TODO
}

export type RootThunkAction = ThunkAction<Promise<void>, State, unknown, Action<string>>;
export type Actions = Action<string>; // TODO: Add action types once they exist.
export type RootDispatch = ThunkDispatch<State, unknown, Actions>;

export const rootReducer: Reducer<State, Actions> = combineReducers({
	// TODO: Add reducers once they exist.	
});

export const initialState: State = {
	// TODO: Combine initial states once they exist.
};
