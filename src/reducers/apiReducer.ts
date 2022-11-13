import { APIActions, API_ACTION_NAMES, SetIsFetchingImageAction } from './../actions/apiActions';
export type FetchStatus = 'inactive' | 'fetching' | 'success' | 'failure';

export interface APIState {
	isFetchingImage: FetchStatus;
}

export const initialState: APIState = {
	isFetchingImage: 'inactive',
};

export function reducer(state = initialState, action: APIActions): APIState {
	switch (action.type) {
		case API_ACTION_NAMES.SET_IS_FETCHING_IMAGE: {
			const { value } = action as SetIsFetchingImageAction;
			return {
				...state,
				isFetchingImage: value,
			};
		} default:
			return state;
	}
}
