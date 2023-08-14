import { RegionNode } from './../data/game';
import { Activity, GameMap } from "../data/game";
import { ExplainableGraphNode } from "../utils/dataStructures";

// TODO: This probably needs to be integrated with the class we already have called GameState... oops. I'm unsure how much of this should be hooked into Redux, although it seems like the answer is all of it.
export interface GameV2State {
	activityHistory: {activity: Activity, data: any}[]; // Last is most recent activity; data type TBD
	regionHistory: string[];
	map: GameMap;

	numActivitiesCompletedInCurrRegion: number;
	mostRecentlyGeneratedImageIdx?: number;
	intimacyScores: {score: number, activityId: string}[]; // Last is most recently logged score
	intentions: any; // TODO

	// FIXME: I propose we handle errors outside of this state. As such, I haven't included GameState.error here.
}

const WELCOME_REGION_ID = "welcome";
const WELCOME_REGION: RegionNode = new ExplainableGraphNode({
	id: WELCOME_REGION_ID,
	recommendNextActivity: (state, constraints) => {
		// TODO: Create/provide intro slide sequence
		// TODO: Make simple slides -> activity helper function
		throw new Error("Not yet implemented.");
	},
	avgIntimacyLevel: 0/2,
});

export const initialState: GameV2State = {
	activityHistory: [],
	regionHistory: [],
	map: {
		start: WELCOME_REGION,
		curr: WELCOME_REGION,
		regionNodes: {
			[WELCOME_REGION_ID]: WELCOME_REGION,
		},
	},
	numActivitiesCompletedInCurrRegion: 0,
	mostRecentlyGeneratedImageIdx: undefined,
	intimacyScores: [],
	intentions: undefined, // TODO
};
