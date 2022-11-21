import { Logger } from "../data/logger";
import { FetchStatus } from "../reducers/apiReducer";
import { RootThunkAction } from "../reducers/rootReducer";
import { initExperiment, saveImage } from "./promptActions";

export const API_ACTION_NAMES = {
	SET_IS_FETCHING_IMAGE: 'SET_IS_FETCHING_IMAGE',
};

const PORT = 4000;
export const API_BASE_URL = `http://localhost:${PORT}`;

export interface SetIsFetchingImageAction {
	type: typeof API_ACTION_NAMES.SET_IS_FETCHING_IMAGE;
	value: FetchStatus;
}

function setIsFetchingImage(value: FetchStatus): SetIsFetchingImageAction {
	return {
		type: API_ACTION_NAMES.SET_IS_FETCHING_IMAGE,
		value,
	};
}

export function generateImage(sectionIndex: number, prompt: string, logger: Logger): RootThunkAction {
	return async (dispatch, getState) => {
		dispatch(setIsFetchingImage('fetching'));

		const state = getState();
		const body = {
			sectionIndex,
			prompt,

			id: state.prompt.experimentId,
			firstPlayerId: state.prompt.firstPlayerId,
			secondPlayerId: state.prompt.secondPlayerId,
			loggingData: logger.dumpData(),
			images: state.prompt.sectionImageUrls,
		};

		fetch(`${API_BASE_URL}/image-gen`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				},
		}).then((response) => response.json())
		.then((data) => {
			const returnedImgPath = data.imageURL;
			dispatch(saveImage(sectionIndex, prompt, returnedImgPath));
			dispatch(setIsFetchingImage('success'));
		}).catch(reason => {
			const msg = "API failed to generate image for prompt: " + prompt + "\nReason: " + reason;
			console.error(msg);
			throw new Error(msg);
		});
	};
}

export function initExperimentData(experimentId: string, firstPlayerId: string, secondPlayerId: string, logger: Logger): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const body = {
			id: experimentId,
			firstPlayerId: firstPlayerId,
			secondPlayerId: secondPlayerId,
			loggingData: logger.dumpData(),
			images: state.prompt.sectionImageUrls,
		};

		fetch(`${API_BASE_URL}/experiment`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				},
		}).then(res => {
			// TODO: Handle success case where there's no existing experiment
			dispatch(initExperiment(experimentId, firstPlayerId, secondPlayerId));
		}).catch(reason => {
			const msg = `API failed to initialize experiment data for experiment ID ${state.prompt.experimentId}. Reason: ${reason}`;
			// TODO: Handle failure cases: 1) there's an existing experiment and the player IDs match so just restore state, or 2) exists but player IDs are wrong so something's weird
		});
	};
}

export function pushExperimentData(logger: Logger): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const body = {
			id: state.prompt.experimentId,
			firstPlayerId: state.prompt.firstPlayerId,
			secondPlayerId: state.prompt.secondPlayerId,
			loggingData: logger.dumpData(),
			images: state.prompt.sectionImageUrls,
		};

		fetch(`${API_BASE_URL}/experiment`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			if (res.status !== 200) {
				const msg = `API failed (status ${res.status}) to store experiment data for experiment ID ${state.prompt.experimentId}.`;
				console.error(msg);
				throw new Error(msg);
			}
		}).catch(reason => {
			const msg = `API failed to store experiment data for experiment ID ${state.prompt.experimentId}. Reason: ${reason}`;
		});
	};
}

export type APIActions = SetIsFetchingImageAction;
