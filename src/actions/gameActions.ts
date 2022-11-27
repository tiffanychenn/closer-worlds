import { RootThunkAction } from "../reducers/rootReducer";
import { EXPERIMENTAL_STORY_DATA, CONTROL_STORY_DATA } from "../components/App/storyData";
import { IAllowsRedo, StoryStepType } from "../data/story";
import { Logger } from "../data/logger";
import { fillPrompt } from "../utils/textUtils";
import { generateImage, initExperimentData, pushExperimentData } from "./apiActions";
// REFACTOR: The story data should probably be part of state for modularity, but I'm not sure.

export const GAME_ACTION_NAMES = {
	SET_SECTION_INDEX: 'SET_SECTION_INDEX',
	SET_STEP_INDEX: 'SET_STEP_INDEX',
	SET_LANDSCAPE_PLAYER: 'SET_LANDSCAPE_PLAYER',
	SET_HAS_USED_REDO: 'SET_HAS_USED_REDO',
	SET_ERROR: 'SET_ERROR',
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
	value: false | number; // Either not used, or the section index in which it was used.
}

/**
 * 
 * @param value Either false for not used, or a number for the section index in which the redo was used.
 * @returns 
 */
function setHasUsedRedo(value: false | number): SetHasUsedRedoAction {
	return {
		type: GAME_ACTION_NAMES.SET_HAS_USED_REDO,
		value,
	};
}

export interface SetErrorAction {
	type: typeof GAME_ACTION_NAMES.SET_ERROR;
	value: string;
}

export function setError(value: string): SetErrorAction {
	return {
		type: GAME_ACTION_NAMES.SET_ERROR,
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

export function advanceStep(logger: Logger, experimentId?: string, firstPlayerId?: string, secondPlayerId?: string, experimentType?: string): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const sectionIndex = state.game.storySection;
		const stepIndex = state.game.storyStep;
		let STORY_DATA = state.prompt.experimentType === "Experimental" ? EXPERIMENTAL_STORY_DATA : CONTROL_STORY_DATA;
		const currSection = STORY_DATA[sectionIndex];
		const currStep = currSection.steps[stepIndex];

		let errorDone = false;

		// Experiment initialization
		if (sectionIndex === 0 && stepIndex === 0){
			// add title slide stuff here
			if (experimentId !== null && firstPlayerId !== null && secondPlayerId !== null && experimentType !== null) {
				STORY_DATA = experimentType === "Experimental" ? EXPERIMENTAL_STORY_DATA : CONTROL_STORY_DATA;
				dispatch(initExperimentData(experimentId, firstPlayerId, secondPlayerId, experimentType, logger)).catch(function(error) {
					dispatch(setError(error.message));
					errorDone = true;
				});
			}
			else {
				const msg = "not complete experiment initialization";
				console.log(msg);
				dispatch(setError(msg));
				errorDone = true;
			}
		}

		if (currStep.triggersGenerate && state.prompt.experimentType === "Experimental") {
			// Then first submit a request to generate the filled in prompt.
			const prompt = currSection.genPrompt;
			if (!prompt) {
				const msg = `ERROR in advanceStep: Section ${sectionIndex} has a WritePrompt step ${stepIndex}, but does not have a genPrompt, so no prompt can be generated.`;
				console.log(msg);
				dispatch(setError(msg));
				errorDone = true;
				// FIXME: This won't work--it's like a race condition. By the time "errorDone" is true, the code below that gets state will already have been false. You'd have to await the error, since these are async functions.
			}
			const promptTransformers = currSection.promptTransformers || {};
			const filledPrompt = fillPrompt(prompt, promptTransformers, logger);
			console.log(`In advanceStep, generating prompt: ${filledPrompt}`);
			dispatch(generateImage(sectionIndex, filledPrompt, logger)); // Want this to happen in parallel
		} else {
			dispatch(pushExperimentData(logger));
		}

		const error = getState().game.error;
		
		if (!errorDone && !error) {
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
		}
	};
}

export function redoSection(sectionIndex: number): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		if (state.game.hasUsedRedo) return; // Don't allow redo more than once!
		const STORY_DATA = state.prompt.experimentType === "Experimental" ? EXPERIMENTAL_STORY_DATA : CONTROL_STORY_DATA;
		const currStep = STORY_DATA[state.game.storySection].steps[state.game.storyStep];
		if ((currStep as any).redoReturnsToStepIndex === undefined) return;
		dispatch(setHasUsedRedo(sectionIndex));
		dispatch(setStepIndex((currStep as IAllowsRedo).redoReturnsToStepIndex));
	};
}


export function redoStep(): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const sectionIndex = state.game.storySection;
		const stepIndex = state.game.storyStep;
		const STORY_DATA = state.prompt.experimentType === "Experimental" ? EXPERIMENTAL_STORY_DATA : CONTROL_STORY_DATA;
		if (stepIndex === 0) {
			if (sectionIndex === 0) {
				// this is title slide!
				return;
			}
			const prevSection = STORY_DATA[sectionIndex - 1];
			dispatch(setSectionIndex(sectionIndex - 1));
			dispatch(setStepIndex(prevSection.steps.length - 1));
		} else {
			dispatch(setStepIndex(stepIndex - 1));
		}
	};
}

export function loadExistingGame(sectionIndex: number, stepIndex: number): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const STORY_DATA = state.prompt.experimentType === "Experimental" ? EXPERIMENTAL_STORY_DATA : CONTROL_STORY_DATA;
		const currSection = STORY_DATA[sectionIndex];
		if (stepIndex == currSection.steps.length - 1) {
			if (sectionIndex == STORY_DATA.length - 1) {
				// TODO: Any ending steps required.
				return;
			}
			dispatch(setSectionIndex(sectionIndex + 1));
			dispatch(setStepIndex(0));
		} else {
			dispatch(setSectionIndex(sectionIndex));
			dispatch(setStepIndex(stepIndex + 1));
		}
	};
}

export type GameActions = SetSectionIndexAction | SetStepIndexAction | SetLandscapePlayerAction | SetHasUsedRedoAction | SetErrorAction;
