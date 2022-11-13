import { SaveImageAction } from './../actions/promptActions';
import { PromptActions, PROMPT_ACTION_NAMES } from "../actions/promptActions";

// Numerical index corresponds to story section index.
// Currently a dictionary instead of an array in case the order gets messed up.
export interface PromptState {
	blanks: { [storySection: number]: string };
	sectionImageUrls: { [storySection: number]: string };
}

export const initialState: PromptState = {
	blanks: {},
	sectionImageUrls: {},
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
			const { sectionIndex, url } = action as SaveImageAction;
			const newSectionImageUrls = Object.assign({}, state.sectionImageUrls);
			newSectionImageUrls[sectionIndex] = url;
			return {
				...state,
				sectionImageUrls: newSectionImageUrls,
			};
		} default:
			return state;
	}
}
