import { RootThunkAction } from "../reducers/rootReducer";

export const GAME_ACTION_NAMES = {
	
};

// TODO: Currently still brainstorming which actions we need; see root reducer.

function fillAndGenerateBlank(value: string) {
	// TODO
	// Get storySection from current state
	// Ensure that it's valid to generate a prompt from that (i.e., we're in the right type of story step, and this story section even has a prompt to fill in)
	// Fill in the blanks of the prompt for the current section
	// Send that to DALL-E's API and await response (see dalle.ts)
	// Send the resulting images to the API to be stored and selected
	// Alternatively: the API handles DALL-E completely separately, shows the WOZ client resulting images, and lets WOZ choose which one to send back to participants
	// Advance to the next step of the story, which is expected to be "reflect," and await response from WOZ telling us we can move on to the next step
}

export type GameActions = { type: string }; // TODO
