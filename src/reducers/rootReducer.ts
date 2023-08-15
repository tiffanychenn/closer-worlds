import { APIActions } from './../actions/apiActions';
import { Action, combineReducers, Reducer } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { GameActions } from '../actions/gameActions';
import { PromptActions } from '../actions/promptActions';
import { GameState, initialState as gameInitialState, reducer as gameReducer } from './gameReducer';
import { initialState as promptInitialState, PromptState, reducer as promptReducer } from './promptReducer';
import { APIState, initialState as apiInitialState, reducer as apiReducer } from './apiReducer';
import { ControlState, initialState as controlInitialState, reducer as controlReducer } from './controlReducer';
import { GameV2State, initialState as gameV2InitialState, reducer as gameV2Reducer } from './gameV2Reducer';
import { GameV2Actions } from '../actions/gameV2Actions';

export interface State {
	game: GameState;
	prompt: PromptState;
	api: APIState;
	control: ControlState;
	gameV2: GameV2State;
}

export type RootThunkAction = ThunkAction<Promise<void>, State, unknown, Action<string>>;
export type Actions = GameActions | PromptActions | APIActions | GameV2Actions;
export type RootDispatch = ThunkDispatch<State, unknown, Actions>;

export const rootReducer: Reducer<State, Actions> = combineReducers({
	game: gameReducer,
	prompt: promptReducer,
	api: apiReducer,
	control: controlReducer,
	gameV2: gameV2Reducer,
});

export const initialState: State = {
	game: gameInitialState,
	prompt: promptInitialState,
	api: apiInitialState,
	control: controlInitialState,
	gameV2: gameV2InitialState,
};
