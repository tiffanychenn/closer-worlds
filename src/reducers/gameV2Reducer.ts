import { IncrementNumActivitiesCompletedInRegionAction, SetNumActivitiesCompletedInRegionAction, UpdateIntimacyScoreAction } from './../actions/gameV2Actions';
import { RegionNode } from '../data/gameV2';
import { Activity, GameMap } from "../data/gameV2";
import { ExplainableGraphNode } from "../utils/dataStructures";
import { GAME_V2_ACTION_NAMES, GameV2Actions } from '../actions/gameV2Actions';
import { V2_REGION_DATA } from '../components/App/storyData';

export interface GameV2State {
	activityHistory: Activity[]; // Last is most recent activity
	activityData: { [activityId: string]: any }; // Data type TBD; probably logger data
	regionHistory: string[]; // Might not be necessary...
	map: GameMap; // Can be used to get current region ID

	numActivitiesCompletedPerRegion: { [regionId: string]: number };
	mostRecentlyGeneratedImageIdx?: number;
	intimacyScores: {score: number, activityId: string}[]; // Last is most recently logged score
	intentions: any; // TODO

	// FIXME: I propose we handle errors outside of this state. As such, I haven't included GameState.error here.
}

const WELCOME_REGION_ID = "welcome";
const WELCOME_REGION: RegionNode = new ExplainableGraphNode({
	id: WELCOME_REGION_ID,
	recommendNextActivity: (state, constraints) => {
		// TODO: Create/provide game start page
		// TODO: Make simple slides -> activity helper function
		throw new Error("Not yet implemented.");
	},
	avgIntimacyLevel: 0/2,
});

export const initialState: GameV2State = {
	activityHistory: [],
	activityData: {},
	regionHistory: [],
	map: {
		start: WELCOME_REGION,
		curr: WELCOME_REGION,
		regionNodes: {
			[WELCOME_REGION_ID]: WELCOME_REGION,
		},
		unexploredRegionIds: V2_REGION_DATA.map(x => x.id), // REFACTOR: Make V2_REGION_DATA a parameter
	},
	numActivitiesCompletedPerRegion: {
		[WELCOME_REGION_ID]: 0,
	},
	mostRecentlyGeneratedImageIdx: undefined,
	intimacyScores: [],
	intentions: undefined, // TODO
};

export function reducer(state = initialState, action: GameV2Actions): GameV2State {
	switch (action.type) {
		case GAME_V2_ACTION_NAMES.SET_NUM_ACTIVITIES_COMPLETED_IN_REGION: {
			const { regionId, numActivities } = action as SetNumActivitiesCompletedInRegionAction;
			return {
				...state,
				numActivitiesCompletedPerRegion: {
					...state.numActivitiesCompletedPerRegion,
					[regionId]: numActivities,
				},
			};
		} case GAME_V2_ACTION_NAMES.INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_REGION: {
			const { regionId } = action as IncrementNumActivitiesCompletedInRegionAction;
			let numActivities = state.numActivitiesCompletedPerRegion[regionId];
			if (numActivities === undefined) {
				numActivities = 0;
			}
			numActivities++;
			return {
				...state,
				numActivitiesCompletedPerRegion: {
					...state.numActivitiesCompletedPerRegion,
					[regionId]: numActivities,
				},
			};
		} case GAME_V2_ACTION_NAMES.INCREMENT_NUM_ACTIVITIES_COMPLETED_IN_CURR_REGION: {
			const regionId = state.map.curr.value.id;
			let numActivities = state.numActivitiesCompletedPerRegion[regionId];
			if (numActivities === undefined) {
				numActivities = 0;
			}
			numActivities++;
			return {
				...state,
				numActivitiesCompletedPerRegion: {
					...state.numActivitiesCompletedPerRegion,
					[regionId]: numActivities,
				},
			};
		} case GAME_V2_ACTION_NAMES.UPDATE_INTIMACY_SCORE: {
			const { score } = action as UpdateIntimacyScoreAction;
			let activityId = state.activityHistory[state.activityHistory.length - 1].id;
			return {
				...state,
				intimacyScores: [...state.intimacyScores, {score, activityId}],
			};
		} default:
			return state;
	}
}
