import { GameActions, GAME_ACTION_NAMES } from './../actions/gameActions';
import { StoryStepType } from "../data/story";

// My current thought is we map these--and possibly more--to different steps within a given story section (of which we have an array). The order of them may vary per section, but at the very least, each of these tells us what kind of page we need to display, and the section gives us the data and indices we need to use to display and act on those things.

export interface GameState {
	storySection: number;
	currAction: StoryStepType;
}

export const initialState: GameState = {
	storySection: 0,
	currAction: StoryStepType.Info,
};

export function reducer(state = initialState, action: GameActions): GameState {
	switch (action.type) {
		default:
			return state;
	}
}
