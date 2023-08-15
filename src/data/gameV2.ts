import { MAX_WORDS, ONE_SECOND_MS, PLANET_ARRIVAL_IMG, V2_REGION_DATA, V2_REGION_IDXS } from '../components/App/storyData';
import { STAR_BG } from "../components/App/storyData";
import { ExplainableGraphNode } from "../utils/dataStructures";
import { ImageStep, ReflectStep, StorySection, StoryStepType, WritePromptStep } from "./story";
import { applyMissingDefaults } from '../utils/utils';
import { API_BASE_URL } from '../actions/apiActions';
import { GameV2State } from '../reducers/gameV2Reducer';

export interface ActivityRecommender {
	// Primarily a function, but...
	(state: GameV2State, constraints: Array<(activity: Activity) => boolean>): Promise<{ activity: Activity, score: number }>;
	// If the function is generated from a series of steps, then we save those steps, too.
	fromOptions?: any; // TODO: Type
}

export interface Region {
	id: string; // Also serves as a user-facing region name. Must be unique.
	recommendNextActivity: ActivityRecommender; // Async to accommodate potential API calls
	avgIntimacyLevel: number; // in [0, 1], to keep things flexible
	nextRegionMustBe?: string[];
	nextRegionCannotBe?: string[];
}

export enum RegionConnectionType {
	SequentialNext = "seq-next",
	SequentialPrev = "seq-prev",
	// TODO: Include others, e.g., connections formed when a contextual similarity was discovered, or when a topic was found that should be gone into more depth about, or when some other comparison was made, or when players manually connected some ideas in different regions, etc., depending on what we make.
}

export type RegionNode = ExplainableGraphNode<Region, RegionConnectionType, string>;

export interface GameMap {
	start: RegionNode;
	curr: RegionNode;
	regionNodes: { [regionId: string]: RegionNode };
	unexploredRegionIds: string[],
}

export enum ActivityType {
	GenerateImage = "generate-image",
	Discuss = "discuss",
}

export interface Activity {
	id: string; // May not be necessary, tbd
	regionId: string;
	configId: string; // The ID of the config it was spawned from
	type: ActivityType;
	section: StorySection;
	startTimestamp: number;
}

export interface ActivityConfig {
	id: string;
	type: ActivityType;
	section: StorySection;
}

export function makeActivityRecommender(activities: ActivityConfig[]): ActivityRecommender {
	let result: ActivityRecommender = async (state, constraints) => {
		// TODO: Convert a list of activity configurations... which... differ from activities somehow maybe???... into logic that dictates when each activity should happen.
		throw new Error("Not yet implemented.");
	};
	result.fromOptions = activities;
	return result;
}

export function chooseRegion(game: GameV2State): { regionId: string, score: number } {
	// To reach this point, we must have decided that it's time to move to a different region in the first place.
		
	// How should we decide? It seems like right now, it should be based on a score. So we have a set of possible regions. Then we score each region and insert it into a heap. Then we take the top one out of the heap. Or... we can just keep it simple and sort and take any of the top scorers.

	// First, we can see if the current region specifies a recommended (set of) next region(s).
	let possibleRegions = [];
	const { nextRegionMustBe, nextRegionCannotBe } = game.map.curr.value;
	if (nextRegionMustBe && nextRegionMustBe.length > 0) {
		possibleRegions = [...nextRegionMustBe];	
	} else {
		// Grab all region ids from our config.
		// REFACTOR: This again should be parametrized so that it's accessible elsewhere in the application without assuming what it is... it should be attached to state, but it's not going to change, so it would be a real shame to have to repeatedly update it with Redux.
		// possibleRegions = [...V2_REGION_DATA.map(x => x.id)];
		// NOTE: For now, we're only going to explore regions we haven't yet.
		possibleRegions = [...game.map.unexploredRegionIds];
	}
	if (nextRegionCannotBe && nextRegionCannotBe.length > 0) {
		for (let regionId of nextRegionCannotBe) {
			let i = possibleRegions.indexOf(regionId);
			if (i > 0) {
				possibleRegions.splice(i, 1);
			}
		}
	}

	// TODO: If we run out of possible regions, or meet some other termination condition, we have reached the end of the game, and should instead trigger that event. It would be nice to have a special "end" region that gets used at that point in time.
	if (possibleRegions.length == 0) {
		throw new Error("Implementation does not yet handle possible regions running out, which should signify the end of the game for now.");
	}

	// Now that we know which regions we can explore, we should score them to determine which would be best to venture out to next.
	// For now, we'll keep it simple and just say we want something to correspond to the expected intimacy level. We'll calculate distance from that. At a later point, we can probably make use of the activity used for scoring--or the most recent region--to find other contextual information that we might be able to use to determine that a region would be good to go to next.
	let { score: currIntimacyScore, activityId: lastScoreActivityId } = game.intimacyScores[game.intimacyScores.length - 1];
	let dist = (region: Region) => 1 / (region.avgIntimacyLevel - currIntimacyScore + 1e-5); // TODO: Choose a better distance function.
	let scores: [string, number][] = possibleRegions.map(id => [id, dist(V2_REGION_DATA[V2_REGION_IDXS[id]])] as [string, number]).sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
	// Normalize scores for consistency... although this distance function is very skewed
	let norm = scores.map(x => x[1]).reduce((a, b) => a + b);
	scores = scores.map(x => [x[0], x[1] / norm]);
	let bestResult = scores[0];
	return { regionId: bestResult[0], score: bestResult[1] };
}

export function prepareActivity(fromInfo: ActivityConfig) {

}

// // TODO: The current idea is to have each region generate any necessary data on the backend as early as possible to save on runtime later. E.g., a region might request to have embeddings generated for its uf-prompts and discussion questions, and those might then get pickled as files on the server rather than staying in and eating lots of memory. The id would be used to ensure that the right embeddings are being used. Alternatively, it might be that a bunch of regions are drawing on a common bank of questions, in which case... we might want to change this to have question + prompt bank IDs. Unclear also whether there might be anything else that's good to provide in advance... TBD as this becomes more dynamic.
// async function prepareRegionBackend(id: string, questions: string[], ufPrompts: string[], mfPrompts: string[]) {
// 	try {
// 		let result = await fetch(`${API_BASE_URL}/adaptQuestion`, {
// 			method: 'POST',
// 			body: JSON.stringify({
// 				regionId: id,
// 				reflectionQuestions: questions,
// 				userFacingPrompts: ufPrompts,
// 				modelFacingPrompts: mfPrompts,
// 			}),
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});
// 	} catch (e) {
// 		let reason = `Failed to prepare backend for region "${id}" with reason:\n\t${e}`;
// 		console.log(reason);
// 		throw new Error(reason);
// 	}
// }

// // Create example region just to see what we might need
// const GARDEN_QUESTIONS = [
// 	"Do you think I've ever been in love?",
//     "What about me is most strange or unfamiliar?",
//     "Do you think I've ever had my heart broken?",
//     "What do you think I'd splurge on?",
//     "What do you think my major is?",
//     "What do you think I'm going to do in the future (work/employment)?",
//     "What was your first impression of me?",
//     "Do you think I was popular in high school?",
//     "On a scale of 1 - 10, how messy do you think my car is?",
//     "Do you think I like hot cheetos?",
//     "Do you think I like to read?",
//     "Do you think I'm in Greek Life?",
//     "Do you think I have a sibling? Older or younger?",
//     "Who do you think is my favorite artist?",
//     "Where do you think I grew up?",
//     "What do you think my favorite Starbucks drink is?",
//     "Do you think I like Taco Bell?",
// ];

// const GARDEN_REGION: Region = {
// 	id: "garden",
// 	avgIntimacyLevel: 0,
// 	recommendNextActivity: async (state, constraints) => {
// 		switch (state.numActivitiesCompletedInCurrRegion) {
// 			default:
// 			case 0: {
// 				// TODO: Image generation activity #1 may draw on context of previous region but not necessarily
// 				break;
// 			} case 1: {
// 				// TODO: Image generation activity #2 should probably just draw on context of previous image generation step but also unclear for now
// 				break;
// 			} case 2: {
// 				try {
// 					let question;
// 					// NOTE: This endpoint doesn't exist yet, this is practically pseudocode at this point
// 					let questionResponse = await fetch(`${API_BASE_URL}/adaptDiscussionQuestion`, {
// 						method: 'POST',
// 						body: JSON.stringify({
// 							regionId: GARDEN_REGION.id,
// 							// TODO: Supply potential contexts from this region + previous regions if relevant.
// 						}),
// 						headers: {
// 							'Content-Type': 'application/json',
// 						},
// 					});
// 					question = (questionResponse as any).result;
// 					let activity = makeDiscussionActivity("garden-reflect", question, state.mostRecentlyGeneratedImageIdx, state.mostRecentlyGeneratedImageIdx);
// 					// TODO: Determine score properly, e.g., by seeing whether the generated question aligns with the users' intimacy score or the target intimacy score for a region if we wind up with such a thing, or aligns with an arc, etc. Or should that be the responsibility of the higher-level activity selection function, and this is just responsible for determining which activity out of a few activities is best for the region specifically because of connection to context? Unclear...
// 					return { activity, score: 1 };
// 				} catch (e) {
// 					let reason = `Failed to generate discussion activity for region "${GARDEN_REGION.id}" with reason:\n\t${e}`;
// 					console.log(reason);
// 					throw new Error(reason);
// 				}
// 			}
// 		}
// 	},
// };

// // TODOs
// // - [ ] Redux action that "completes" an activity

// // FIXME: I'm getting a sneaking suspicion that the functions below are redundant and/or that our scaffolding for slides could be much cleaner. Thoughts?

// type GenerateImageActivityOptions = {
// 	exampleText?: string,
// 	backgroundImage?: string | number,
// 	backgroundImage2?: string | number,
// 	cardImage?: string | number,
// 	cardImage2?: string | number,
// 	timeLimitMs?: number,
// 	wordLimit?: number,
// };

// const DEFAULT_GENERATE_IMAGE_ACTIVITY_OPTIONS: GenerateImageActivityOptions = {
// 	exampleText: "e.g., big pink puffy trees near lots of rivers",
// 	backgroundImage: STAR_BG,
// 	cardImage: undefined,
// 	backgroundImage2: undefined,
// 	cardImage2: undefined,
// 	timeLimitMs: 1.5 * 60 * ONE_SECOND_MS,
// 	wordLimit: MAX_WORDS,
// };

// // FIXME: Neither of these is providing a player. Maybe they shouldn't. Unclear whether it makes sense to specify that anymore. How else to better build collaborative behavior, if we want that?

// export function makeGenerateImageActivity(id: string, ufPrompt: string, genPrompt: string, options: GenerateImageActivityOptions = DEFAULT_GENERATE_IMAGE_ACTIVITY_OPTIONS): Activity {
// 	// FIXME: This will force any value that is *intentionally* undefined to be defined. Oof.
// 	options = applyMissingDefaults(options, DEFAULT_GENERATE_IMAGE_ACTIVITY_OPTIONS) as GenerateImageActivityOptions;
// 	// REFACTOR: Should this instead be that we just provide the index of the image we'd like to show, or a string if we'd like it to be static (make those two separate), and then assume the next image will be whichever image has been most recently generated (which isn't guaranteed to be the next index, given that users might be shown an older image if they're going back to a previous region)? Probably yes, but I want to wait until this is hooked into Redux.
// 	const cardImage2 = options.cardImage2
// 		? options.cardImage2
// 		: (typeof options.cardImage == "number"
// 			? options.cardImage + 1
// 			: (options.cardImage == PLANET_ARRIVAL_IMG
// 				? 0 // FIXME: This might be the wrong index--I remember us doing something either zero-indexed or arbitrarily indexed.
// 				: undefined));
// 	const backgroundImage2 = options.backgroundImage2
// 		? options.backgroundImage2
// 		: (typeof options.backgroundImage == "number"
// 			? options.backgroundImage + 1
// 			: (options.backgroundImage == STAR_BG
// 				? 0 // FIXME: See above.
// 				: STAR_BG));
// 	return {
// 		type: ActivityType.GenerateImage,
// 		id: id,
// 		section: {
// 			genPrompt: genPrompt,
// 			steps: [
// 				{
// 					type: StoryStepType.WritePrompt,
// 					id: `${id}-generate`,
// 					triggersGenerate: true,
// 					instructions: ufPrompt,
// 					backgroundImage: options.backgroundImage,
// 					cardImage: options.cardImage,
// 					exampleText: options.exampleText,
// 					wordLimit: options.wordLimit,
// 				} as WritePromptStep,
// 				{
// 					type: StoryStepType.Image,
// 					id: `${id}-view`,
// 					backgroundImage: backgroundImage2,
// 					cardImage: cardImage2,
// 				} as ImageStep,
// 			],
// 		},
// 		startTimestamp: Date.now(),
// 	}
// }

// export function makeDiscussionActivity(id: string, question: string, backgroundImage: string | number | undefined = STAR_BG, cardImage: string | number | undefined = PLANET_ARRIVAL_IMG): Activity {
// 	return {
// 		type: ActivityType.Discuss,
// 		id: id,
// 		section: {
// 			steps: [
// 				{
// 					type: StoryStepType.Reflect,
// 					id: `${id}-reflect`,
// 					question,
// 					backgroundImage,
// 					cardImage,
// 				} as ReflectStep,
// 			]
// 		},
// 		startTimestamp: Date.now(),
// 	};
// };
