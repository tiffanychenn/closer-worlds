import { V2_REGION_DATA, V2_REGION_IDXS } from "../components/App/storyData";
import { Region, chooseRegion } from "../data/gameV2";
import { GameV2State } from "../reducers/gameV2Reducer";
import { RootThunkAction } from "../reducers/rootReducer";

export const GAME_V2_ACTION_NAMES = {
	// The three below are probably redundant, just handy to have potentially.
	SET_NUM_ACTIVITIES_COMPLETED_IN_REGION: 'SET_NUM_ACTIVITIES_COMPLETED_IN_REGION',
	INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_REGION: 'INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_REGION',
	INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_CURR_REGION: 'INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_CURR_REGION',
	
	UPDATE_INTIMACY_SCORE: 'UPDATE_INTIMACY_SCORE',
};

export interface SetNumActivitiesCompletedInRegionAction {
	type: typeof GAME_V2_ACTION_NAMES.SET_NUM_ACTIVITIES_COMPLETED_IN_REGION;
	regionId: string;
	numActivities: number;
}

function setNumActivitiesCompletedInRegion(regionId: string, numActivities: number): SetNumActivitiesCompletedInRegionAction {
	return {
		type: GAME_V2_ACTION_NAMES.SET_NUM_ACTIVITIES_COMPLETED_IN_REGION,
		regionId,
		numActivities,
	};
}

export interface IncrementNumActivitiesCompletedInRegionAction {
	type: typeof GAME_V2_ACTION_NAMES.INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_REGION;
	regionId: string;
}

function incrementNumActivitiesCompletedInRegion(regionId: string): IncrementNumActivitiesCompletedInRegionAction {
	return {
		type: GAME_V2_ACTION_NAMES.INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_REGION,
		regionId,
	};
}

export interface IncrementNumActivitiesCompletedInCurrRegionAction {
	type: typeof GAME_V2_ACTION_NAMES.INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_CURR_REGION;
}

function incrementNumActivitiesCompletedInCurrRegion(regionId: string): IncrementNumActivitiesCompletedInCurrRegionAction {
	return {
		type: GAME_V2_ACTION_NAMES.INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_REGION,
	};
}

// TODO: For the above three, we'll need to have a composite action for "completing" an activity.

export interface UpdateIntimacyScoreAction {
	type: typeof GAME_V2_ACTION_NAMES.UPDATE_INTIMACY_SCORE;
	score: number;
	// Assumes updating for current activity.
}

function updateIntimacyScore(score: number): UpdateIntimacyScoreAction {
	return {
		type: GAME_V2_ACTION_NAMES.UPDATE_INTIMACY_SCORE,
		score,
	};
}

export function advanceRegion(): RootThunkAction {
	return async (dispatch, getState) => {
		const state = getState();
		const chosenRegionInfo = chooseRegion(state.gameV2);
		// TODO: Transition to that region
		// TODO: Handle end of game
	}
}

export function advanceStep(): RootThunkAction {
	return async (dispatch, getState) => {
		// TODO
		const state = getState();
		throw new Error("Not yet implemented.");
	}
}

export type GameV2Actions = SetNumActivitiesCompletedInRegionAction
	| IncrementNumActivitiesCompletedInRegionAction
	| IncrementNumActivitiesCompletedInCurrRegionAction
	| UpdateIntimacyScoreAction;
