import { FetchStatus } from "../reducers/apiReducer";
import { RootThunkAction } from "../reducers/rootReducer";
import { saveImage } from "./promptActions";

export const API_ACTION_NAMES = {
	SET_IS_FETCHING_IMAGE: 'SET_IS_FETCHING_IMAGE',
};

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

export function generateImage(sectionIndex: number, prompt: string): RootThunkAction {
	return async dispatch => {
		dispatch(setIsFetchingImage('fetching'));
		// TODO: Send request for DALL-E image, await response (should be a URL where
		// the image is being stored), and then replace TEMP_IMAGE below with that URL.
		// TODO: Also handle failure case!
		const TEMP_IMAGE = 'https://cdnb.artstation.com/p/assets/images/images/051/898/687/large/luke-wells-luke-wells-landscape-midjourney.jpg';
		dispatch(saveImage(sectionIndex, TEMP_IMAGE));
		dispatch(setIsFetchingImage('success'));
	};
}

export type APIActions = SetIsFetchingImageAction;
