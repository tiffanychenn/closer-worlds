import { ImageStep, ReflectStep, StorySection, StoryStepType, WritePromptStep } from './../../data/story';
import { StoryStep } from '../../data/story';

const PLACEHOLDER_IMG_URL = 'https://cdnb.artstation.com/p/assets/images/images/051/898/687/large/luke-wells-luke-wells-landscape-midjourney.jpg';
const STAR_BG = './assets/stars_bg_16.png';

export const STORY_DATA: Array<StorySection> = [
	{
		genPrompt: "a test that looks like {test-write-prompt-blank}",
		steps: [
			{
				type: StoryStepType.WritePrompt,
				id: 'test-write-prompt',
				player: 'landscape',
				title: "{Curr}, it's your turn to type.",
				instructions: "You agree that {curr} will start with the landscape. {Curr} grabs the magic wand first.\nPicture a dream place that you would both want to live. It can be as fictional as you want, after all, you have a magic wand.\nThink about plant life, animal life. Are there rocks, lakes or rivers? What colors are very prominent?\nBriefly, describe the terrain and texture of the landscape.",
				exampleText: "e.g., big pink puffy trees near lots of rivers",
				backgroundImage: STAR_BG,
				timeLimitMs: 10000,
				// TODO: Test with and without card image.
			} as WritePromptStep,
			{
				type: StoryStepType.Reflect,
				id: 'test-reflect',
				player: 'landscape',
				question: "{Curr}, what about this landscape makes you most excited and why?",
				backgroundImage: STAR_BG,
			} as ReflectStep,
			{
				type: StoryStepType.Image,
				id: 'test-image',
				cardImage: PLACEHOLDER_IMG_URL,
				backgroundImage: PLACEHOLDER_IMG_URL,
				redoReturnsToStepIndex: 0,
			} as ImageStep,
		],
	},
];
