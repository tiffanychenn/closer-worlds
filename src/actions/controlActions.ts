import { FAST_FRIENDS_DATA } from "../components/App/storyData";
import { Logger } from "../data/logger";
import { RootThunkAction } from "../reducers/rootReducer";
import { initExperimentData, pushExperimentData } from "./apiActions";
import { setError } from "./gameActions";

export const CONTROL_ACTION_NAMES = {
	SET_SET_INDEX: 'SET_SET_INDEX',
	SET_QUESTION_INDEX: 'SET_QUESTION_INDEX',
	SET_FINISHED_ALL_QUESTIONS: 'SET_FINISHED_ALL_QUESTIONS',
	SET_SHOULD_START_NEXT_SET: 'SET_SHOULD_START_NEXT_SET',
	SET_DISPLAY_INTRO: 'SET_DISPLAY_INTRO',
};

export interface SetControlSetIndexAction {
	type: typeof CONTROL_ACTION_NAMES.SET_SET_INDEX;
	value: number;
}

function setControlSetIndex(value: number): SetControlSetIndexAction {
	return {
		type: CONTROL_ACTION_NAMES.SET_SET_INDEX,
		value,
	};
}

export interface SetControlQuestionIndexAction {
	type: typeof CONTROL_ACTION_NAMES.SET_QUESTION_INDEX;
	value: number;
}

function setControlQuestionIndex(value: number): SetControlQuestionIndexAction {
	return {
		type: CONTROL_ACTION_NAMES.SET_QUESTION_INDEX,
		value,
	};
}

export interface SetFinishedAllQuestionsAction {
	type: typeof CONTROL_ACTION_NAMES.SET_FINISHED_ALL_QUESTIONS;
	value: boolean;
}

function setFinishedAllQuestions(value: boolean): SetFinishedAllQuestionsAction {
	return {
		type: CONTROL_ACTION_NAMES.SET_FINISHED_ALL_QUESTIONS,
		value,
	};
}

export interface SetShouldStartNextSetAction {
	type: typeof CONTROL_ACTION_NAMES.SET_SHOULD_START_NEXT_SET;
	value: boolean;
}

function setShouldStartNextSet(value: boolean): SetShouldStartNextSetAction {
	return {
		type: CONTROL_ACTION_NAMES.SET_SHOULD_START_NEXT_SET,
		value,
	};
}

export interface SetDisplayIntroAction {
	type: typeof CONTROL_ACTION_NAMES.SET_DISPLAY_INTRO;
	value: boolean;
};

function setDisplayIntro(value: boolean): SetDisplayIntroAction {
	return {
		type: CONTROL_ACTION_NAMES.SET_DISPLAY_INTRO,
		value,
	};
}

export function startControlQuestions(): RootThunkAction {
	return async (dispatch, getState) => {
		dispatch(setDisplayIntro(false));
		setTimeout(() => {
			if (getState().control.setIndex == 0) {
				dispatch(setShouldStartNextSet(true));
			}
		}, FAST_FRIENDS_DATA[0].timeoutMs);
	};
}

export function advanceControlQuestion(logger: Logger, experimentId?: string, firstPlayerId?: string, secondPlayerId?: string): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const setIndex = state.control.setIndex;
		const questionIndex = state.control.questionIndex;

		if (!FAST_FRIENDS_DATA[setIndex]) {
			dispatch(setError("Exceeded question index in advanceQuestion."));
			throw new Error("Exceeded question index in advanceQuestion.");
		}

		if (setIndex === 0 && questionIndex === 0) {
			// Initialize experiment
			if (experimentId !== null && firstPlayerId !== null && secondPlayerId !== null) {
				dispatch(initExperimentData(experimentId, firstPlayerId, secondPlayerId, 'Control', logger)).catch(function(error) {
					dispatch(setError(error.message));
				});
			}
			else {
				const msg = "not complete experiment initialization";
				console.log(msg);
				dispatch(setError(msg));
			}
		}

		if (questionIndex >= FAST_FRIENDS_DATA[setIndex].questions.length - 1) {
			if (setIndex == FAST_FRIENDS_DATA.length - 1) {
				// Handle end of game
				dispatch(setFinishedAllQuestions(true));
			} else {
				// Advance to next section
				dispatch(setShouldStartNextSet(true));
			}
		} else {
			// Advance only to next question
			dispatch(setControlQuestionIndex(questionIndex + 1));
		}

		// Finally, update data on server
		dispatch(pushExperimentData(logger));
	};
}

export function advanceControlSet(logger: Logger): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const setIndex = state.control.setIndex;

		dispatch(setShouldStartNextSet(false));

		if (setIndex == FAST_FRIENDS_DATA.length - 1) {
			// Handle end of game
			dispatch(setFinishedAllQuestions(true));
			dispatch(pushExperimentData(logger));
			return;
		}

		dispatch(setControlSetIndex(setIndex + 1));
		dispatch(setControlQuestionIndex(0));
		dispatch(pushExperimentData(logger));

		setTimeout(() => {
			// If set index hasn't changed, then push participants forward at time limit
			if (getState().control.setIndex == setIndex + 1) {
				dispatch(setShouldStartNextSet(true));
			}
		}, FAST_FRIENDS_DATA[setIndex + 1].timeoutMs);
	};
}

// Only capable of going back a question, not a set.
export function redoControlQuestion(logger: Logger): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const questionIndex = state.control.questionIndex;
		if (questionIndex === 0) {
			return;
		}
		dispatch(setControlQuestionIndex(questionIndex - 1));
		dispatch(pushExperimentData(logger));
	};
}

export type ControlActions = SetControlSetIndexAction | SetControlQuestionIndexAction | SetShouldStartNextSetAction | SetFinishedAllQuestionsAction | SetDisplayIntroAction;
