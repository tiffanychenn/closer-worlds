import { DEBUG_MODE } from "../components/App/ParticipantApp";
import { PLACEHOLDER_IMG_URL } from "../components/App/storyData";
import { Logger } from "../data/logger";
import { FetchStatus } from "../reducers/apiReducer";
import { RootThunkAction } from "../reducers/rootReducer";
import { loadExistingGame, setError } from "./gameActions";
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
		if (DEBUG_MODE) {
			console.log(`generateImage: Currently in debug mode, so no image will be generated. Prompt (or command) that would have been used:\n${prompt}`);
			dispatch(setIsFetchingImage('success'));
			return;
		}

		function makeError(msg: string) {
			console.error(msg);
			dispatch(setError(msg));
			return new Error(msg);
		}

		const state = getState();

		// Handle special prompts
		let finalPrompt = prompt;
		let pathToVary = undefined;
		if (prompt[0] == "!") {
			console.log(`generateImage: Using the following prompt as command: ${prompt}`);
			if (prompt.substring(0,5) == '!redo') {
				// Retrieve a prompt from a previous section, and regenerate it.
				const argSectionIndex = parseInt(prompt[5]);
				if (isNaN(argSectionIndex)) throw makeError(`generateImage failed to execute command ${prompt}: an invalid section index argument was provided.`);
				const argSectionImageUrl = state.prompt.sectionImageUrls[argSectionIndex];
				if (!argSectionImageUrl) throw makeError(`generateImage failed to execute command ${prompt}: no section image could be found for section ${argSectionIndex}.`);
				finalPrompt = argSectionImageUrl.filledPrompt;
			} else if (prompt.substring(0,5) == '!keep') {
				// Retrieve an image from a previous section, and simply keep it without regenerating.
				const argSectionIndex = parseInt(prompt[5]);
				if (isNaN(argSectionIndex)) {
					throw makeError(`generateImage failed to execute command ${prompt}: an invalid section index argument was provided.`);
				}
				
				dispatch(setIsFetchingImage('fetching'));

				const keepPrevImage = () => {
					const argSectionImageUrl = state.prompt.sectionImageUrls[argSectionIndex];
					if (!argSectionImageUrl) {
						throw makeError(`generateImage failed to execute command ${prompt}: no section image could be found for section ${argSectionIndex}.`);
					}
					dispatch(saveImage(sectionIndex, argSectionImageUrl.filledPrompt, argSectionImageUrl.path));
					dispatch(setIsFetchingImage('success'));
				};

				const argPretendTimeout = prompt[6];
				if (argPretendTimeout == 't') {
					setTimeout(keepPrevImage, 5000);
				} else {
					keepPrevImage();
				}
				return;
				// Early return since no DALL-E generation is required
			} else if (prompt.substring(0,5) == '!vary') {
				// Generate a variation of a previous section.
				const argSectionIndex = parseInt(prompt[5]);
				if (isNaN(argSectionIndex)) throw makeError(`generateImage failed to execute command ${prompt}: an invalid section index argument was provided.`);
				const argSectionImageUrl = state.prompt.sectionImageUrls[argSectionIndex];
				if (!argSectionImageUrl) throw makeError(`generateImage failed to execute command ${prompt}: no section image could be found for section ${argSectionIndex}.`);
				pathToVary = argSectionImageUrl.path;
			}
		}

		dispatch(setIsFetchingImage('fetching'));
		
		const body = {
			sectionIndex,
			prompt: finalPrompt,

			id: state.prompt.experimentId,
			firstPlayerId: state.prompt.firstPlayerId,
			secondPlayerId: state.prompt.secondPlayerId,
			loggingData: logger.dumpData(),
			images: state.prompt.sectionImageUrls,
		} as any;

		if (pathToVary) {
			body.pathToVary = pathToVary;
		}

		const endpoint = pathToVary ? 'image-variation' : 'image-gen';

		fetch(`${API_BASE_URL}/${endpoint}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				},
		}).then((response) => response.json())
		.then((data) => {
			const returnedImgPath = data.imageURL;
			dispatch(saveImage(sectionIndex, finalPrompt, returnedImgPath));
			dispatch(setIsFetchingImage('success'));
		}).catch(reason => {
			throw makeError("API failed to generate image for prompt: " + finalPrompt + "\nReason: " + reason);
		});
	};
}

export function initExperimentData(experimentId: string, firstPlayerId: string, secondPlayerId: string, experimentType: string, logger: Logger): RootThunkAction {
	return async (dispatch, getState) => {
		if (DEBUG_MODE) {
			dispatch(initExperiment(experimentId, firstPlayerId, secondPlayerId, experimentType));
			return;
		}

		const state = getState();
		const body = {
			id: experimentId,
			firstPlayerId: firstPlayerId,
			secondPlayerId: secondPlayerId,
			loggingData: logger.dumpData(),
			images: state.prompt.sectionImageUrls,
			sectionIndex: state.game.storySection,
			stepIndex: state.game.storyStep,
			experimentType: experimentType
		};

		fetch(`${API_BASE_URL}/startExperiment`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				},
		})
		.then((response) => response.json())
		.then(data => {
			dispatch(initExperiment(experimentId, firstPlayerId, secondPlayerId, experimentType));
			if (data.isExistingExperiment) {
				logger.loadPreviousExperimentData(data.experimentData.loggingData);
				Object.keys(data.experimentData.images).forEach((sectionIndex) => {
					const image = data.experimentData.images[sectionIndex];
					dispatch(saveImage(parseInt(sectionIndex), image.filledPrompt, image.path))
				});
				dispatch(loadExistingGame(data.experimentData.sectionIndex, data.experimentData.stepIndex));
			}
		}).catch(reason => {
			const msg = `API failed to initialize experiment data for experiment ID ${state.prompt.experimentId}. Reason: ${reason}`;
			dispatch(setError(msg));
			throw new Error(msg);
		});
	};
}

export function pushExperimentData(logger: Logger): RootThunkAction {
	return async (dispatch, getState) => {
		if (DEBUG_MODE) return;

		const state = getState();
		const body = {
			id: state.prompt.experimentId,
			firstPlayerId: state.prompt.firstPlayerId,
			secondPlayerId: state.prompt.secondPlayerId,
			loggingData: logger.dumpData(),
			images: state.prompt.sectionImageUrls,
			sectionIndex: state.game.storySection,
			stepIndex: state.game.storyStep,
			experimentType: state.prompt.experimentType,
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
				dispatch(setError(msg));
				throw new Error(msg);
			}
		}).catch(reason => {
			const msg = `API failed to store experiment data for experiment ID ${state.prompt.experimentId}. Reason: ${reason}`;
		});
	};
}

export type APIActions = SetIsFetchingImageAction;
