import { ImageStep, ReflectStep, StorySection, StoryStepType, TitleStep, WritePromptStep, InfoStep, CustomFormStep, RoleSelectStep } from '../../data/story';

export const PLACEHOLDER_IMG_URL = 'https://cdnb.artstation.com/p/assets/images/images/051/898/687/large/luke-wells-luke-wells-landscape-midjourney.jpg';
export const STAR_BG = './assets/stars_bg_16.png';
export const PLANET_ARRIVAL_IMG = PLACEHOLDER_IMG_URL;
export const WAND_IMG = PLACEHOLDER_IMG_URL;
export const PLANET_DEPARTURE_IMAGE = PLACEHOLDER_IMG_URL;

export const STORY_DATA: Array<StorySection> = [
	{
		steps: [
			{
				type: StoryStepType.Title,
				id: 'title',
			} as TitleStep,
			{
				type: StoryStepType.Info,
				id: 'scenario-1',
				backgroundImage: STAR_BG,
				cardImage: PLANET_ARRIVAL_IMG,
				title: 'Imagine:',
				instructions: 'Researchers at the MIT Media Lab have invented teleportation! The two of you sign up for a study right away. During the study, something goes wrong, and the two of you get stranded on a distant, but seemingly habitable planet.',
				player: 1,
				playerAction: "Read out loud",
			} as InfoStep,
			{
				type: StoryStepType.RoleSelect,
				id: 'role-select',
				tags: ["peaceful", "fun", "adventurous", "epic", "safe", "creative", "weird"],
			} as RoleSelectStep,
		],
	},

	{
		genPrompt: "a test that looks like {test-write-prompt-blank}",
		steps: [
			{
				type: StoryStepType.WritePrompt,
				id: 'test-write-prompt',
				player: 'landscape',
				playerAction: 'Take the lead.',
				title: "Describe the landscape:",
				instructions: "You agree that {curr} will start with the landscape. {Curr} grabs the magic wand first.\n\nPicture a dream place that you would both want to live. It can be as fictional as you want, after all, you have a magic wand.\n\nThink about plant life, animal life. Are there rocks, lakes or rivers? What colors are very prominent?\n\nBriefly, describe the terrain and texture of the landscape.",
				hint: "If you're not sure, feel free to ask {other}!",
				exampleText: "e.g., big pink puffy trees near lots of rivers",
				backgroundImage: STAR_BG,
				// cardImage: PLACEHOLDER_IMG_URL,
				timeLimitMs: 10000,
				wordLimit: 5,
			} as WritePromptStep,
			{
				type: StoryStepType.Reflect,
				id: 'test-reflect',
				player: 'landscape',
				question: "{Curr}, what about this landscape makes you most excited and why?",
				backgroundImage: STAR_BG,
				cardImage: PLACEHOLDER_IMG_URL,
			} as ReflectStep,
			{
				type: StoryStepType.Image,
				id: 'test-image',
				cardImage: PLACEHOLDER_IMG_URL,
				backgroundImage: PLACEHOLDER_IMG_URL,
				redoReturnsToStepIndex: 0,
				blurBG: true,
				overlayBG: false,
			} as ImageStep,
		],
	},
];
