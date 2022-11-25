import { APIActions } from './../actions/apiActions';
import { Action, combineReducers, Reducer } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { GameActions } from '../actions/gameActions';
import { PromptActions } from '../actions/promptActions';
import { GameState, initialState as gameInitialState, reducer as gameReducer } from './gameReducer';
import { initialState as promptInitialState, PromptState, reducer as promptReducer } from './promptReducer';
import { APIState, initialState as apiInitialState, reducer as apiReducer } from './apiReducer';
import { ControlState, initialState as controlInitialState, reducer as controlReducer } from './controlReducer';

export interface State {
	game: GameState;
	prompt: PromptState;
	api: APIState;
	control: ControlState;
}

export type RootThunkAction = ThunkAction<Promise<void>, State, unknown, Action<string>>;
export type Actions = GameActions | PromptActions | APIActions;
export type RootDispatch = ThunkDispatch<State, unknown, Actions>;

export const rootReducer: Reducer<State, Actions> = combineReducers({
	game: gameReducer,
	prompt: promptReducer,
	api: apiReducer,
	control: controlReducer,
});

export const initialState: State = {
	game: gameInitialState,
	prompt: promptInitialState,
	api: apiInitialState,
	control: controlInitialState,
};

/* Brainstorming list of all actions:
 * - We need a way to move between story steps. This sometimes depends on first
 *   inputting something.
 * - Restart the experience. Restore everything to its initial state.
 * - Await response from the WOZ client. How do we do that? Polling? Ew.
 * - The WOZ client also has to await responses from the participant client.
 * - 
 */
