import { GameActions, GAME_ACTION_NAMES, SetLandscapePlayerAction, SetSectionIndexAction, SetStepIndexAction, SetHasUsedRedoAction, SetErrorAction, SetIntimacyScoreAction } from './../actions/gameActions';

// My current thought is we map these--and possibly more--to different steps within a given story section (of which we have an array). The order of them may vary per section, but at the very least, each of these tells us what kind of page we need to display, and the section gives us the data and indices we need to use to display and act on those things.

export interface GameState {
	storySection: number;
	storyStep: number;
	intimacyScore: number;
	landscapePlayer: 1 | 2;
	hasUsedRedo: false | number;
	error: string;
}

export const initialState: GameState = {
	storySection: 0,
	storyStep: 0,
	intimacyScore: 0,
	landscapePlayer: 1, // Ok to assume 1, since this won't be used before necessary.
	hasUsedRedo: false,
	error: "",
};

export function reducer(state = initialState, action: GameActions): GameState {
	switch (action.type) {
		case GAME_ACTION_NAMES.SET_SECTION_INDEX: {
			const { value } = action as SetSectionIndexAction;
			return {
				...state,
				storySection: value,
			};
		} case GAME_ACTION_NAMES.SET_STEP_INDEX: {
			const { value } = action as SetStepIndexAction;
			return {
				...state,
				storyStep: value,
			};
		} case GAME_ACTION_NAMES.SET_INTIMACY_SCORE: {
			const { value } = action as SetIntimacyScoreAction;
			return {
				...state,
				intimacyScore: value,
			};
		} case GAME_ACTION_NAMES.SET_LANDSCAPE_PLAYER: {
			const { value } = action as SetLandscapePlayerAction;
			return {
				...state,
				landscapePlayer: value,
			};
		} case GAME_ACTION_NAMES.SET_HAS_USED_REDO: {
			const { value } = action as SetHasUsedRedoAction;
			return {
				...state,
				hasUsedRedo: value,
			};
		} case GAME_ACTION_NAMES.SET_ERROR: {
			const { value } = action as SetErrorAction;
			return {
				...state,
				error: value,
			};
		} default:
			return state;
	}
}
