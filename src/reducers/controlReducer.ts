import { ControlActions, CONTROL_ACTION_NAMES, SetControlQuestionIndexAction, SetControlSetIndexAction, SetShouldStartNextSetAction, SetFinishedAllQuestionsAction, SetDisplayIntroAction } from './../actions/controlActions';
export interface ControlState {
	setIndex: number;
	questionIndex: number;
	shouldStartNextSet: boolean;
	finishedAllQuestions: boolean;
	displayIntro: boolean;
}

export const initialState: ControlState = {
	setIndex: 0,
	questionIndex: 0,
	shouldStartNextSet: false,
	finishedAllQuestions: false,
	displayIntro: true,
};

export function reducer(state = initialState, action: ControlActions): ControlState {
	switch (action.type) {
		case CONTROL_ACTION_NAMES.SET_QUESTION_INDEX: {
			const { value } = action as SetControlQuestionIndexAction;
			return {
				...state,
				questionIndex: value,
			};
		} case CONTROL_ACTION_NAMES.SET_SET_INDEX: {
			const { value } = action as SetControlSetIndexAction;
			return {
				...state,
				setIndex: value,
			};
		} case CONTROL_ACTION_NAMES.SET_SHOULD_START_NEXT_SET: {
			const { value } = action as SetShouldStartNextSetAction;
			return {
				...state,
				shouldStartNextSet: value,
			};
		} case CONTROL_ACTION_NAMES.SET_FINISHED_ALL_QUESTIONS: {
			const { value } = action as SetFinishedAllQuestionsAction;
			return {
				...state,
				finishedAllQuestions: value,
			};
		} case CONTROL_ACTION_NAMES.SET_DISPLAY_INTRO: {
			const { value } = action as SetDisplayIntroAction;
			return {
				...state,
				displayIntro: value,
			};
		}
		default:
			return state;
	}
}
