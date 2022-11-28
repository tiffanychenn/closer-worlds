import { ImageStep, ReflectStep, StorySection, StoryStepType, TitleStep, WritePromptStep, InfoStep, CustomFormStep, RoleSelectStep, ControlSet } from '../../data/story';
import ShortTextBox from '../atoms/input/ShortTextBox';
import { Slider } from '../atoms/input/Slider';
import { TagGroup } from '../atoms/input/TagGroup';
import { Hint, PageHeader, Text } from '../atoms/text/Text';

export const PLACEHOLDER_IMG_URL = 'https://cdnb.artstation.com/p/assets/images/images/051/898/687/large/luke-wells-luke-wells-landscape-midjourney.jpg';
export const STAR_BG = './assets/stars_bg_16.png';
export const PLAIN_BG = '#0B0B25';
export const PLANET_ARRIVAL_IMG = './assets/arrival.png';
export const WAND_IMG = './assets/wand.png';
export const PLANET_DEPARTURE_IMAGE = './assets/departure.png';
export const INSTRUCTIONS_1 = './assets/instructions_1.png';
export const INSTRUCTIONS_2 = './assets/instructions_2.png';
// FIXME: It seems like when we use low-res images, flexbox throws a hissy fit and decides to keep things small. We might need to use viewport sizing instead.

export const EXPERIMENTAL_GAME_NAME = "Closer Worlds";
export const CONTROL_GAME_NAME = "Collaborative Game Study";

export const ONE_SECOND_MS = 1000;
export const FAKE_MINIMUM_GENERATE_TIME = 45 * ONE_SECOND_MS;

export const EXPERIMENTAL_STORY_DATA: Array<StorySection> = [
	{
		steps: [
			{
				type: StoryStepType.Title,
				id: 'title',
			} as TitleStep,
			{
				type: StoryStepType.Info,
				id: 'intro',
				backgroundImage: STAR_BG,
				title: "Welcome to " + EXPERIMENTAL_GAME_NAME,
				instructions: "Today, you embark on a creative journey together. \n\nThe intention of this game is to *get closer by unlocking your collective imagination.* Through the magic of co-creation, we might discover new things about one another.",
				images: ['./assets/examples/1.png', './assets/examples/2.png', './assets/examples/3.png', './assets/examples/4.png'],
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'how-to-play-1',
				backgroundImage: STAR_BG,
				cardImage: INSTRUCTIONS_1,
				cardImageFit: true,
				title: 'How to Play',
				instructions: "This game will guide you through a creative story. Throughout the game you will be asked to take turns reading instructions and entering short lines of text. This will be used to make an image.",
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'how-to-play-2',
				backgroundImage: STAR_BG,
				cardImage: INSTRUCTIONS_2,
				cardImageFit: true,
				title: 'How to Play',
				instructions: "Afterward, you'll be asked to pull a discussion card. Answer the question on the card as much as you feel comfortable. \n\nTake your time to really listen to each others stories. See how your conversation can shape a more meaningful image built from both of your wildest imaginations.",
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'scenario-1',
				backgroundImage: STAR_BG,
				cardImage: PLANET_ARRIVAL_IMG,
				player: 1,
				playerAction: "Read out loud",
				title: 'Imagine:',
				instructions: 'Researchers at the MIT Media Lab have invented teleportation! The two of you sign up for a study right away. During the study, something goes wrong, and the two of you get stranded on a distant but seemingly habitable planet.',
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'scenario-2',
				backgroundImage: STAR_BG,
				cardImage: WAND_IMG,
				player: 2,
				playerAction: "Read out loud",
				instructions: "While wandering the strange planet, you're delighted to discover a magic wand that can create anything in your imagination.\n\nAfter taking care of basic necessities, you're struck with inspiration: you can use this wand to create the world of your dreams!\n\nTogether, you decide to stay a while, and create a dream place for you both to live.",
			} as InfoStep,
			{
				type: StoryStepType.CustomForm,
				id: 'intro-world-tags',
				backgroundImage: STAR_BG,
				player: 'both',
				playerAction: "Player 1, read out loud",
				maxWidthIfNoImageCard: false,
				timeLimitMs: 1 * 60 * ONE_SECOND_MS,
				requiredFormElemIds: ['world-tags'],
				makeContent: (logger, hasTimedOut, renderText) => <>
					<PageHeader>Set the stage:</PageHeader>
					<Text>{renderText("Consider the things that you both have in common. What is the vibe of a world that you both would enjoy?")}</Text>
					<Hint showLabel={false}>{renderText("Select all which apply, or write one of your own.")}</Hint>
					<TagGroup id="world-tags"
							  logger={logger}
							  includeInput={true}
							  placeholder="other..."
							  tags={["peaceful", "fun", "adventurous", "epic", "safe", "creative", "weird"]}/>
				</>,
			} as CustomFormStep,
			{
				type: StoryStepType.RoleSelect,
				id: 'role-select',
				timeLimitMs: 0.5 * 60 * ONE_SECOND_MS,
			} as RoleSelectStep,
		],
	},

	{
		genPrompt: "landscape with {landscape-prompt-blank}",
		steps: [
			{
				type: StoryStepType.WritePrompt,
				triggersGenerate: true,
				id: 'landscape-prompt',
				player: 'landscape',
				playerAction: 'Take the lead',
				title: "Describe the landscape:",
				instructions: "What kind of nature do you enjoy most on Earth? Are there mountains, lakes, or rivers? Think about the plants and colors that bring you joy.\n\nWith this in mind, *paint a picture of the terrain and texture of the landscape.*",
				hint: "Feel free to discuss your choices as a pair.",
				exampleText: "e.g., big pink puffy trees near lots of rivers",
				backgroundImage: STAR_BG,
				cardImage: PLANET_ARRIVAL_IMG,
				timeLimitMs: 1.5 * 60 * ONE_SECOND_MS,
				wordLimit: 15,
			} as WritePromptStep,
			{
				type: StoryStepType.Reflect,
				id: 'landscape-reflect',
				player: 'landscape',
				playerAction: "Read out loud",
				question: "{Curr}, recall an especially interesting time you've been in nature. What made it so special?",
				backgroundImage: STAR_BG,
				cardImage: PLANET_ARRIVAL_IMG,
			} as ReflectStep,
			{
				type: StoryStepType.Image,
				id: 'landscape-display',
				cardImage: 1,
				backgroundImage: 1,
				redoReturnsToStepIndex: 0,
				blurBG: true,
				overlayBG: false,
			} as ImageStep,
		],
	},

	{
		genPrompt: "landscape with {landscape-prompt-blank}, buildings that look like {buildings-prompt-blank}",
		steps: [
			{
				type: StoryStepType.WritePrompt,
				triggersGenerate: true,
				id: 'buildings-prompt',
				player: 'buildings',
				playerAction: "It's your turn now",
				title: "Design some buildings:",
				instructions: "What kinds of spaces make you feel most at home? Is it big city buildings, or cozy rustic cabins? Consider the kinds of things that you like to do.\n\nWith this in mind, briefly *describe a building or set of buildings.*",
				exampleText: "e.g., treehouses with lush gardens",
				backgroundImage: 1,
				cardImage: 1,
				blurBG: true,
				overlayBG: true,
				timeLimitMs: 1.5 * 60 * ONE_SECOND_MS,
				wordLimit: 15,
			} as WritePromptStep,
			{
				type: StoryStepType.Reflect,
				id: 'buildings-reflect',
				player: 'buildings',
				playerAction: "Read out loud",
				question: "{Curr}, in what kind of spaces do you most feel like your authentic self? How might the buildings you made let you access that?",
				backgroundImage: 1,
				cardImage: 1,
				blurBG: true,
				overlayBG: true,
			} as ReflectStep,
			{
				type: StoryStepType.Image,
				id: 'buildings-display',
				cardImage: 2,
				backgroundImage: 2,
				redoReturnsToStepIndex: 0,
				blurBG: true,
				overlayBG: false,
			} as ImageStep,
		],
	},

	{ 
		genPrompt: "landscape with {landscape-prompt-blank}, buildings that look like {buildings-prompt-blank}, in the background {miss-prompt-blank}",
		steps: [
			{
				type: StoryStepType.WritePrompt,
				triggersGenerate: true,
				id: 'miss-prompt',
				player: 'buildings',
				playerAction: "It's your turn now",
				title: "Add some meaning:",
				instructions: "It's important to you to make this a nice place for your partner to live as well. Think about what parts of life they think are most precious.\n\nWhat would your partner miss most from back home? *Add some object to the world that would help them feel more at home.*",
				exampleText: "e.g., science fiction library",
				backgroundImage: 2,
				cardImage: 2,
				blurBG: true,
				overlayBG: true,
				timeLimitMs: 1.5 * 60 * ONE_SECOND_MS,
				wordLimit: 15,
			} as WritePromptStep,
			{
				type: StoryStepType.Reflect,
				id: 'miss-reflect',
				player: 'buildings',
				playerAction: "Read out loud",
				question: "{Other}, is this a meaningful gift? In general, what is the best way for your friends to show that they care?",
				backgroundImage: 2,
				cardImage: 2,
				blurBG: true,
				overlayBG: true,
			} as ReflectStep,
			{
				type: StoryStepType.Image,
				id: 'miss-display',
				cardImage: 3,
				backgroundImage: 3,
				redoReturnsToStepIndex: 0,
				blurBG: true,
				overlayBG: false,
			} as ImageStep,
		],
	},

	{
		genPrompt: "landscape with {landscape-prompt-blank}, buildings that look like {buildings-prompt-blank}, in the background {miss-prompt-blank}, in the foreground {gift-prompt-blank}",
		steps: [
			{
				type: StoryStepType.WritePrompt,
				triggersGenerate: true,
				id: 'gift-prompt',
				player: 'landscape',
				playerAction: "It's your turn now",
				title: "Give a gift:",
				instructions: "You're touched by your partner's gesture, and want to give them something in return.\n\nWhat is something positive about your partner? How could you build something here that honors them? *Describe some object which represents this positive aspect of your partner.*",
				exampleText: "e.g., creative workshop",
				backgroundImage: 3,
				cardImage: 3,
				blurBG: true,
				overlayBG: true,
				timeLimitMs: 1.5 * 60 * ONE_SECOND_MS,
				wordLimit: 15,
			} as WritePromptStep,
			{
				type: StoryStepType.Reflect,
				id: 'gift-reflect',
				player: 'landscape',
				playerAction: "Read out loud",
				question: "{Other}, how do you feel being labeled with these positive qualities? Are there other hidden parts of you that you wish others would also see?",
				backgroundImage: 3,
				cardImage: 3,
				blurBG: true,
				overlayBG: true,
			} as ReflectStep,
			{
				type: StoryStepType.Image,
				id: 'gift-display',
				cardImage: 4,
				backgroundImage: 4,
				redoReturnsToStepIndex: 0,
				blurBG: true,
				overlayBG: false,
			} as ImageStep,
		],
	},

	{
		genPrompt: "landscape with {landscape-prompt-blank}, buildings that look like {buildings-prompt-blank}, in the background {miss-prompt-blank}, in the foreground {gift-prompt-blank}{style-tags}",
		promptTransformers: {
			'style-tags': value => {
				let result = ". ultra detailed";

				// Imagination
				if (value.toLowerCase().indexOf("imagination") >= 0) {
					result += " octane render";
				}

				// Chaos or calm
				if (value.toLowerCase().indexOf("chaos") >= 0) {
					result += " dali style surrealist";
				} else if (value.toLowerCase().indexOf("calm") >= 0) {
					result += " studio ghibli";
				}

				return result;
			},
		},
		steps: [
			{
				type: StoryStepType.CustomForm,
				triggersGenerate: true,
				id: 'value-styles-prompt',
				player: 'both',
				playerAction: "Player 2, read out loud",
				cardImage: 4,
				backgroundImage: 4,
				blurBG: true,
				overlayBG: true,
				requiredFormElemIds: ['style-tags'],
				maxWidthIfNoImageCard: false,
				timeLimitMs: 1.5 * 60 * ONE_SECOND_MS,
				makeContent: (logger, hasTimedOut, renderText) => <>
					<PageHeader>Reflections</PageHeader>
					<Text>{renderText("Notice the ways in which things all around you have started to take shape. Which statements do you *both* agree with?")}</Text>
					<Hint showLabel={false}>{renderText("Select as many as feel meaningful to you.")}</Hint>
					<TagGroup id='style-tags'
							  logger={logger}
							  includeInput={false}
							  tags={[
								"We both have vibrant *imaginations*",
								"We both feel more *in-sync* now",
								"We are both excited by *chaos*",
								"We feel more comfortable in *calm* places",
								"We are both *nervous to share* personal stuff with others",
							  ]}/>
				</>,
			} as CustomFormStep,
			{
				type: StoryStepType.Reflect,
				id: 'value-styles-reflect',
				player: 'both',
				playerAction: "Player 1, read out loud",
				question: "What was your first impression of one another? Has that changed at all now?",
				backgroundImage: 4,
				cardImage: 4,
				blurBG: true,
				overlayBG: true,
			} as ReflectStep,
			{
				type: StoryStepType.Image,
				id: 'value-styles-display',
				cardImage: 5,
				backgroundImage: 5,
				redoReturnsToStepIndex: 0,
				blurBG: true,
				overlayBG: false,
			} as ImageStep,
		],
	},

	{
		genPrompt: "{represented-both-slider}",
		promptTransformers: {
			'represented-both-slider': value => {
				const KEEP_PREV = '!vary5';
				const REDO_PREV = '!redo5';
				// Currently silently errors by assuming to keep rather than redo the image.
				let val = value;
				if (value[0] == '!') {
					let parts = value.split(':');
					if (parts.length < 2) return KEEP_PREV;
					val = value.split(':')[1];
				} else if (typeof value != 'number') {
					val = parseInt(value);
					if (isNaN(val)) return KEEP_PREV;
				}
				return val < 50 ? REDO_PREV : KEEP_PREV;
			},
		},
		steps: [
			{
				type: StoryStepType.CustomForm,
				triggersGenerate: true,
				id: 'represented',
				player: 'both',
				playerAction: 'Player 2, read out loud',
				cardImage: 5,
				backgroundImage: 5,
				blurBG: true,
				overlayBG: true,
				requiredFormElemIds: ['represented-p1-slider', 'represented-p2-slider', 'represented-both-slider'],
				maxWidthIfNoImageCard: false,
				timeLimitMs: 1.5 * 60 * ONE_SECOND_MS,
				makeContent: (logger, hasTimedOut, renderText) => <>
					<PageHeader>Evaluate</PageHeader>
					<Text>{renderText("Look around at the world you have created together. *Do you feel personally represented by this space you have co-created? Why or why not?*")}</Text>
					<PageHeader>Player 1:</PageHeader>
					<Slider id="represented-p1-slider"
							logger={logger}
							leftLabel="Not at all"
							rightLabel="Super accurate"/>
					<PageHeader>Player 2:</PageHeader>
					<Slider id="represented-p2-slider"
							logger={logger}
							leftLabel="Not at all"
							rightLabel="Super accurate"/>
					<PageHeader>Both of us:</PageHeader>
					<Slider id="represented-both-slider"
							logger={logger}
							leftLabel="Not at all"
							rightLabel="Super accurate"/>
				</>,
			} as CustomFormStep,
			{
				type: StoryStepType.Reflect,
				id: 'represented-reflect',
				player: 'both',
				playerAction: 'Player 1, read out loud',
				question: "What is something that is really important to you, that most people don't get to hear, or that you seldom have the chance to share?",
				backgroundImage: 5,
				cardImage: 5,
				blurBG: true,
				overlayBG: true,
			} as ReflectStep,
			{
				type: StoryStepType.Image,
				id: 'represented-display',
				cardImage: 6,
				backgroundImage: 6,
				redoReturnsToStepIndex: 0,
				blurBG: true,
				overlayBG: false,
			} as ImageStep,
		],
	},
	
	{
		steps: [
			{
				type: StoryStepType.Info,
				id: 'ending',
				player: 'both',
				playerAction: 'Read the following',
				cardImage: 6,
				backgroundImage: 6,
				blurBG: true,
				overlayBG: true,
				instructions: "Suddenly, a teleportation machine appears in front of you. Booming out from a speaker onboard, you hear the voices of the researchers: \"It's time to come back to the Media Lab!\"\n\nBoth of you walk into the machine, take one last look at the world you made, and return home.\n\nThe end.",
				hideNext: true,
				hideBack: true,
			} as InfoStep,
		],
	},
];

export const FAST_FRIENDS_DATA: Array<ControlSet> = [
	{
		timeoutMs: 6 * 60 * ONE_SECOND_MS,
		questions: [
			"Given the choice of anyone in the world, whom would you want as a dinner guest?",
			"Would you like to be famous? In what way?",
			"Before making a telephone call, do you ever rehearse what you are going to say? Why?",
			"What would constitute a \"perfect\" day for you?",
			"When did you last sing to yourself? To someone else?",
			"If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?",
			"Do you have a secret hunch about how you will die?",
			"Name three things you and your partner appear to have in common.",
			"For what in your life do you feel most grateful?",
			"If you could change anything about the way you were raised, what would it be?",
			"Take a minute to tell your partner your life story in as much detail as possible.",
			"If you could wake up tomorrow having gained any one quality or ability, what would it be?",
		],
	},

	{
		timeoutMs: 6 * 60 * ONE_SECOND_MS,
		questions: [
			"If a crystal ball could tell you the truth about yourself, your life, or anything else, what would you want to know?",
			"Is there something that you've dreamed of doing for a long time? Why haven't you done it?",
			"What is the greatest accomplishment of your life?",
			"What do you value most in a friendship?",
			"What is your most treasured memory?",
			"What is your most terrible memory?",
			"If you knew that in one year you would die suddenly, would you change anything about the way you are now living? Why?",
			"What does friendship mean to you?",
			"What roles do love and affection play in your life?",
			"Alternate sharing something you consider a positive characteristic of your partner. Share a total of 5 items.",
			"How close and warm is your family? Do you feel your childhood was happier than most other people's?",
			"How do you feel about your relationship with your mother?",
		],
	},

	{
		timeoutMs: 6 * 60 * ONE_SECOND_MS,
		questions: [
			"Make 3 true \"we\" statements. For instance, \"We are both in this room feeling...\"",
			"Complete this sentence: \"I wish I had someone with whom I could share...\"",
			"If you were going to become a close friend with your partner, please share what would be important for him or her to know.",
			"Tell your partner what you like about them; be very honest this time saying things that you might not say to someone you've just met.",
			"Share with your partner an embarrassing moment in your life.",
			"When did you last cry in front of another person? By yourself?",
			"Tell your partner something that you like about them already.",
			"What, if anything, is too serious to be joked about?",
			"If you were to die this evening with no opportunity to communicate with anyone, what would you most regret not having told someone? Why haven't you told them yet?",
			"Your house, containing everything you own, catches fire. After saving your loved ones and pets, you have time to safely make a final dash to save any one item. What would it be? Why?",
			"Of all the people in your family, whose death would you find most disturbing? Why?",
			"Share a personal problem and ask your partner's advice on how he or she might handle it. Also, ask your partner to reflect back to you how you seem to be feeling about the problem you have chosen.",
		],
	},
];

// DEPRECATED: No need to update this.
export const CONTROL_STORY_DATA: Array<StorySection> = [
	{
		steps: [
			{
				type: StoryStepType.Title,
				id: 'title',
			} as TitleStep,
			{
				type: StoryStepType.Info,
				id: 'intro',
				backgroundImage: PLAIN_BG,
				title: "Welcome to " + CONTROL_GAME_NAME,
				instructions: "This activity is about interpersonal closeness. Your task, which we think will be quite enjoyable, is simply to get close to your partner, with whom you've been matched.\n\nIn alternating order, take turns reading questions that appear on screen. Read it *out loud*, carry out the activity, then move on when you are ready.",
			} as InfoStep,
		],
	},
	{
		steps: [
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-1-question-1-player-1',
				player: 1,
				playerAction: "It's your turn now",
				title: "Answer this question:",
				instructions: "Given the choice of anyone in the world, whom would you want as a dinner guest?",
				backgroundImage: PLAIN_BG,
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-1-question-1-player-2',
				player: 2,
				playerAction: "It's your turn now",
				title: "Answer this question:",
				instructions: "Given the choice of anyone in the world, whom would you want as a dinner guest?",
				backgroundImage: PLAIN_BG,
			} as InfoStep,
		],
	},
	{
		steps: [
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-1-question-2-player-2',
				player: 1,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "If you could wake up tomorrow having gained any one quality or ability, what would it be?",
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-1-question-2-player-1',
				player: 2,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "If you could wake up tomorrow having gained any one quality or ability, what would it be?",
			} as InfoStep,
		],
	},
	{
		steps: [
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-2-question-3-player-2',
				player: 1,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "If a crystal ball could tell you the truth about yourself, your life, the future, or anything else, what would you want to know?",
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-2-question-3-player-1',
				player: 2,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "If a crystal ball could tell you the truth about yourself, your life, the future, or anything else, what would you want to know?",
			} as InfoStep,
		],
	},
	{
		steps: [
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-2-question-4-player-1',
				player: 1,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "How close and warm is your family? Do you feel your childhood was happier than most other people's?",
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-2-question-4-player-2',
				player: 2,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "How close and warm is your family? Do you feel your childhood was happier than most other people's?",
			} as InfoStep,
		],
	},
	{
		steps: [
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-3-question-5-player-1',
				player: 1,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "If you were going to become a close friend with your partner, what would be important for them to know?",
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-3-question-5-player-2',
				player: 2,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "If you were going to become a close friend with your partner, what would be important for them to know?",
			} as InfoStep,
		],
	},
	{
		steps: [
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-3-question-6-player-2',
				player: 1,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "If you were to die this evening with no opportunity to communicate with anyone, what would you most regret not having told someone? Why haven't you told them yet?",
			} as InfoStep,
			{
				type: StoryStepType.Info,
				id: 'fast-friends-set-3-question-6-player-1',
				player: 2,
				playerAction: "It's your turn now",
				backgroundImage: PLAIN_BG,
				title: "Answer this question:",
				instructions: "If you were to die this evening with no opportunity to communicate with anyone, what would you most regret not having told someone? Why haven't you told them yet?",
			} as InfoStep,
		],
	},
	{
		steps: [
			{
				type: StoryStepType.Info,
				id: 'ending',
				player: 'both',
				playerAction: 'Read the following',
				backgroundImage: STAR_BG,
				cardImage: PLANET_ARRIVAL_IMG,
				blurBG: true,
				instructions: "Thank you for sharing and playing the game!\n\nThe end.",
				hideNext: true,
			} as InfoStep,
		],
	},
];
