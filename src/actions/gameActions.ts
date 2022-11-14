import { RootThunkAction } from "../reducers/rootReducer";
import { getStoryStep } from "../utils/utils";
import { STORY_DATA } from "../components/App/storyData";
import { IAllowsRedo, StoryStepType } from "../data/story";
import { Logger } from "../data/logger";
import { fillPrompt } from "../utils/textUtils";
import { generateImage, pushExperimentData } from "./apiActions";
// REFACTOR: The story data should probably be part of state for modularity, but I'm not sure.

export const GAME_ACTION_NAMES = {
	SET_SECTION_INDEX: 'SET_SECTION_INDEX',
	SET_STEP_INDEX: 'SET_STEP_INDEX',
	SET_LANDSCAPE_PLAYER: 'SET_LANDSCAPE_PLAYER',
	SET_HAS_USED_REDO: 'SET_HAS_USED_REDO',
};

export interface SetSectionIndexAction {
	type: typeof GAME_ACTION_NAMES.SET_SECTION_INDEX;
	value: number;
}

function setSectionIndex(sectionIndex: number): SetSectionIndexAction {
	return {
		type: GAME_ACTION_NAMES.SET_SECTION_INDEX,
		value: sectionIndex,
	};
}

export interface SetStepIndexAction {
	type: typeof GAME_ACTION_NAMES.SET_STEP_INDEX;
	value: number;
}

function setStepIndex(stepIndex: number): SetStepIndexAction {
	return {
		type: GAME_ACTION_NAMES.SET_STEP_INDEX,
		value: stepIndex,
	};
}

export interface SetLandscapePlayerAction {
	type: typeof GAME_ACTION_NAMES.SET_LANDSCAPE_PLAYER;
	value: 1 | 2;
}

export function setLandscapePlayer(value: 1 | 2): SetLandscapePlayerAction {
	return {
		type: GAME_ACTION_NAMES.SET_LANDSCAPE_PLAYER,
		value,
	};
}

export interface SetHasUsedRedoAction {
	type: typeof GAME_ACTION_NAMES.SET_HAS_USED_REDO;
	value: boolean;
}

function setHasUsedRedo(value: boolean): SetHasUsedRedoAction {
	return {
		type: GAME_ACTION_NAMES.SET_HAS_USED_REDO,
		value,
	};
}

// function fillAndGenerateBlank(value: string) {
// 	// TODO
// 	// Get storySection from current state
// 	// Ensure that it's valid to generate a prompt from that (i.e., we're in the right type of story step, and this story section even has a prompt to fill in)
// 	// Fill in the blanks of the prompt for the current section
// 	// Send that to DALL-E's API and await response (see dalle.ts)
// 	// Send the resulting images to the API to be stored and selected
// 	// Alternatively: the API handles DALL-E completely separately, shows the WOZ client resulting images, and lets WOZ choose which one to send back to participants
// 	// Advance to the next step of the story, which is expected to be "reflect," and await response from WOZ telling us we can move on to the next step
// }

export function advanceStep(logger: Logger): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const sectionIndex = state.game.storySection;
		const stepIndex = state.game.storyStep;
		const currSection = STORY_DATA[sectionIndex];
		const currStep = currSection.steps[stepIndex];

		// FIXME: If async things get weird, this might need to go last.
		if (currStep.type == StoryStepType.WritePrompt) {
			// Then first submit a request to generate the filled in prompt.
			const prompt = currSection.genPrompt;
			if (!prompt) {
				const msg = `ERROR in advanceStep: Section ${sectionIndex} has a WritePrompt step ${stepIndex}, but does not have a genPrompt, so no prompt can be generated.`;
				console.log(msg);
				throw new Error(msg);
			}
			const promptTransformers = currSection.promptTransformers || {};
			const filledPrompt = fillPrompt(prompt, promptTransformers, logger);
			console.log(`In advanceStep, generating prompt: ${filledPrompt}`);
			dispatch(generateImage(sectionIndex, filledPrompt, logger)); // Want this to happen in parallel
		} else {
			dispatch(pushExperimentData(logger));
		}

		// Increment story and step index
		if (stepIndex == currSection.steps.length - 1) {
			if (sectionIndex == STORY_DATA.length - 1) {
				// TODO: Any ending steps required.
				return;
			}
			dispatch(setSectionIndex(sectionIndex + 1));
			dispatch(setStepIndex(0));
		} else {
			dispatch(setStepIndex(stepIndex + 1));
		}
	};
}

export function redoSection(): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		if (state.game.hasUsedRedo) return; // Don't allow redo more than once!
		const currStep = STORY_DATA[state.game.storySection].steps[state.game.storyStep];
		if ((currStep as any).redoReturnsToStepIndex === undefined) return;
		dispatch(setHasUsedRedo(true));
		dispatch(setStepIndex((currStep as IAllowsRedo).redoReturnsToStepIndex));
	};
}

export type GameActions = SetSectionIndexAction | SetStepIndexAction | SetLandscapePlayerAction | SetHasUsedRedoAction; // TODO
