export const PROMPT_ACTION_NAMES = {
	FILL_BLANK: 'FILL_BLANK',
};

export interface FillBlankAction {
	type: typeof PROMPT_ACTION_NAMES.FILL_BLANK;
	storySection: number;
	value: string;
}

function fillBlank(storySection: number, value: string): FillBlankAction {
	return {
		type: PROMPT_ACTION_NAMES.FILL_BLANK,
		storySection,
		value,
	};
}

export type PromptActions = FillBlankAction;
