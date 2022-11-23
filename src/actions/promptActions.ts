export const PROMPT_ACTION_NAMES = {
	// FILL_BLANK: 'FILL_BLANK',
	SAVE_IMAGE: 'SAVE_IMAGE',
	INIT_EXPERIMENT: 'INIT_EXPERIMENT',
};

// export interface FillBlankAction {
// 	type: typeof PROMPT_ACTION_NAMES.FILL_BLANK;
// 	formElemId: string;
// 	timestamp: number;
// 	storySection: number;
// 	value: string;
// }

// export function fillBlank(formElemId: string, timestamp: number, storySection: number, value: string): FillBlankAction {
// 	return {
// 		type: PROMPT_ACTION_NAMES.FILL_BLANK,
// 		formElemId,
// 		timestamp,
// 		storySection,
// 		value,
// 	};
// }

// NOTE: Originally, I was going to store blanks here, but now that logger is handling it,
// this code is obsolete. However! One potential problem is that when we fetch blank values
// from logger, we assume that the blanks' values must simply be the latest values of those
// form elements. It's highly unlikely but slightly possible that new values will be logged
// to those form elements at some point in the process, which... if that occurs, it'll be
// a bit nightmarish to fix. We may need to return to this as a result, so I'm leaving it
// here just in case.

export interface SaveImageAction {
	type: typeof PROMPT_ACTION_NAMES.SAVE_IMAGE,
	sectionIndex: number,
	filledPrompt: string,
	path: string,
}

export function saveImage(sectionIndex: number, filledPrompt: string, path: string): SaveImageAction {
	return {
		type: PROMPT_ACTION_NAMES.SAVE_IMAGE,
		sectionIndex,
		filledPrompt,
		path,
	};
}

export interface InitExperimentAction {
	type: typeof PROMPT_ACTION_NAMES.INIT_EXPERIMENT;
	experimentId: string;
	firstPlayerId: string;
	secondPlayerId: string;
	experimentType: string;
}

export function initExperiment(experimentId: string, firstPlayerId: string, secondPlayerId: string, experimentType: string) {
	return {
		type: PROMPT_ACTION_NAMES.INIT_EXPERIMENT,
		experimentId,
		firstPlayerId,
		secondPlayerId,
		experimentType,
	};
}

export type PromptActions = SaveImageAction | InitExperimentAction;
