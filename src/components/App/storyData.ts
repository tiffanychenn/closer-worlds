import { StorySection, StoryStepType } from './../../data/story';
import { StoryStep } from '../../data/story';

// TODO: Create and export an array of StorySteps below. More info to come once the types + Redux infra are done.
export const STORY_DATA: Array<StorySection> = [
	{
		steps: [
			{ type: StoryStepType.Info, /* TODO: Content */ },
		],
	},
	{
		genPrompt: "landscape with {0}",
		steps: [
			
		],
	},
	{
		genPrompt: "landscape with {0} with buildings that look like {1}.",
		steps: [
			
		],
	},
	{
		genPrompt: "landscape with {0} with buildings that look like {1}. In the background {2}.",
		steps: [
			
		],
	},
	{
		genPrompt: "landscape with {0} with buildings that look like {1}. In the background {2}. In the foreground is {3}",
		steps: [
			
		],
	},
];
