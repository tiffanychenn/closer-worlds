import { SaveImageAction, PromptActions, PROMPT_ACTION_NAMES, InitExperimentAction } from "../actions/promptActions";

// Numerical index corresponds to story section index.
// Currently a dictionary instead of an array in case the order gets messed up.

export type SectionImageUrls = { [storySection: number]: {
	filledPrompt: string,
	path: string,
} };

export interface PromptState {
	// blanks: { [storySection: number]: string };
	// sectionImageUrls: { [storySection: number]: string };
	sectionImageUrls: SectionImageUrls;
	// TODO: Add prompt to this data
	
	experimentId: string;
	firstPlayerId: string;
	secondPlayerId: string;
}

export const initialState: PromptState = {
	// blanks: {},
	sectionImageUrls: {},

	experimentId: "",
	firstPlayerId: "",
	secondPlayerId: "",
};

export function reducer(state = initialState, action: PromptActions): PromptState {
	switch (action.type) {
		// case PROMPT_ACTION_NAMES.FILL_BLANK: {
		// 	const { storySection, value } = action as FillBlankAction;
		// 	const newBlanks = Object.assign({}, state.blanks);
		// 	newBlanks[storySection] = value;
		// 	return {
		// 		...state,
		// 		blanks: newBlanks,
		// 	};
		case PROMPT_ACTION_NAMES.SAVE_IMAGE: {
			const { sectionIndex, filledPrompt, path } = action as SaveImageAction;
			const newSectionImageUrls = Object.assign({}, state.sectionImageUrls);
			newSectionImageUrls[sectionIndex] = {
				filledPrompt,
				path,
			};
			return {
				...state,
				sectionImageUrls: newSectionImageUrls,
			};
		} case PROMPT_ACTION_NAMES.INIT_EXPERIMENT: {
			const { experimentId, firstPlayerId, secondPlayerId } = action as InitExperimentAction;
			return {
				...state,
				experimentId,
				firstPlayerId,
				secondPlayerId,
			};
		} default:
			return state;
	}
}
