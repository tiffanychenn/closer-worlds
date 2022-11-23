import * as React from "react";
import { Logger } from "./logger";

export interface StorySection {
	steps: Array<StoryStep>;
	genPrompt?: string; // Formatted like "this is some text with {0} and refers to the result from prompt {1} and so on"
	promptTransformers?: { [formElemId: string]: (value: any) => string }; // Used to convert blank values into strings, e.g., choosing a word for a slider.
}

export enum StoryStepType {
	Info = 'info', // often for storyline, just reading written text
	WritePrompt = 'writeprompt',
	Reflect = 'reflect',
	Image = 'image', // possibly image selection
	Title = 'title', // title slide, should also probably put experiment generation code here
	CustomForm = 'customform',
	RoleSelect = 'roleselect',
}

export interface StoryStep {
	type: StoryStepType;
	id: string;
	
	// If an image is a string, then it should point to a source.
	// If an image is a number, that points to the index of the step
	// whose resulting image we want to display.
	backgroundImage?: string | number; // If undefined, a linear gradient is used instead.
	cardImage?: string | number; // If undefined, no card is shown.
	blurBG?: boolean; // Whether to blur the background image.
	overlayBG?: boolean; // Whether to overlay the background image with a translucent color layer.

	timeLimitMs?: number; // If undefined, no time limit will appear.
}

// In any info text, {curr} will always be replaced with the current player (e.g., "player 1"),
// and {other} will always be replaced with the other player (e.g., "player 2"). If the first
// character should be capitlized (i.e., "Player 1" instead of "player 1"), please capitalize
// the first letter of the placeholder (i.e., {Curr} instead of {curr}).

// Anything that isn't a title can also handle bolding in the form of *s. If you write *hello*
// in instructions, for example, it will be rendered as <strong>hello<strong>.

export interface IAllowsRedo {
	// If undefined, redo is disallowed. Otherwise, specifies the index of the
	// StoryStep within this StorySection to which users should be sent back to
	// perform their redo.
	redoReturnsToStepIndex?: number;
}

export interface WritePromptStep extends StoryStep {
	type: typeof StoryStepType.WritePrompt;
	player: 1 | 2 | 'landscape' | 'buildings' | 'both';
	playerAction: string;
	title: string;
	instructions: string;
	hint?: string;
	exampleText: string;

	wordLimit?: number;
	charLimit?: number;
}

export interface ReflectStep extends StoryStep {
	type: typeof StoryStepType.Reflect;
	player: 'landscape' | 'buildings' | 'both';
	question: string;
	cardImage: string | number;
}

export interface ImageStep extends StoryStep, IAllowsRedo {
	type: typeof StoryStepType.Image;
	cardImage: string | number;
}

export interface TitleStep extends StoryStep {
	type: typeof StoryStepType.Title;
}

export interface InfoStep extends StoryStep {
	type: typeof StoryStepType.Info;
	title?: string;
	instructions: string;
	player?: 1 | 2 | 'landscape' | 'buildings' | 'both',
	playerAction?: string;
	hint?: string;
	hideNext?: boolean;
}

export interface CustomFormStep extends StoryStep {
	type: typeof StoryStepType.CustomForm;
	player?: 1 | 2 | 'landscape' | 'buildings' | 'both';
	playerAction?: string;
	requiredFormElemIds: string[]; // For ensuring that everything is filled out.
	makeContent: (logger: Logger, hasTimedOut: boolean, renderText: (text: string) => React.ReactNode) => React.ReactNode;
	maxWidthIfNoImageCard?: string | false; // Defaults to 600px.
	itemSpacing: string; // Defaults to 30px.
}

export interface RoleSelectStep extends StoryStep {
	type: typeof StoryStepType.RoleSelect;
	tags: string[]; // Used for the affect words question (i.e., "What kind of world do you dream of building? Why?").
}
