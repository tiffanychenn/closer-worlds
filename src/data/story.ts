export interface StorySection {
	steps: Array<StoryStep>;
	genPrompt?: string; // Formatted like "this is some text with {0} and refers to the result from prompt {1} and so on"
}

export enum StoryStepType {
	Info = 'info', // often for storyline, just reading written text
	WritePrompt = 'writeprompt',
	Reflect = 'reflect',
	Image = 'image', // possibly image selection
}

export interface StoryStep {
	type: StoryStepType;
}

/* Types of steps, and what data they need.
 * 
 * Almost everything has a question or a title. But it gets displayed so differently. Hm.
 * WritePrompt: The prompt string up to this point, with placeholder indices. The title or
 *   question, of course, that prompts it. A time limit, maybe, unless that's universal
 *   across these. Which player(s) should be speaking. Possibly a BG image.
 * Reflect: A title/question. That's really all. Also, which player(s) should speak. Possibly a BG image, probably not though.
 * Image: Just show the image. Possibly ask a question about the image? But probably not.
 * Info: This one's tough because of potential visual differences between these slides. Unsure.
 */

// TODO: We still need to build out all the sub-datatypes that I've suggested above, but I want to wait on that until we have a clearer idea of what we're for sure going with for the game. Currently brainstorming, but wanted to at least commit this.
