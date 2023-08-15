import { API_BASE_URL } from "../actions/apiActions";
import { BlankTransformers, fillPrompt } from "../utils/textUtils";
import { Logger } from "./logger";

// -- GENSTRING TYPES -- //

export enum GenStringType {
	Static = "Static", // Just use the string verbatim; don't modify it.
	Template = "Template", // Fill in the blanks with context.
	Guideline = "Guideline", // Apply context to one baseline string.
	GuidelineRange = "GuidelineRange", // Choose or interpolate between the most relevant baseline strings, then apply context.
	Prompt = "Prompt", // Directly prompt an LLM to generate a string for you.
}

export interface BaseGenString {
	type: GenStringType;
}

export interface SingleValueGenString extends BaseGenString {
	type: typeof GenStringType.Static
		| typeof GenStringType.Template
		| typeof GenStringType.Guideline
		| typeof GenStringType.Prompt;
	value: string;
}

// For template GenStrings:
// Specify templates using "A string with {logger-item-id} placeholders."
// Alternatively, to specify context, you can use "A string with {context} placeholders." It's not yet possible to specify a given context--it's simply the top context chosen recently.

export interface GuidelineRangeGenString extends BaseGenString {
	type: typeof GenStringType.GuidelineRange;
	value: string[];
	compareMode: "semantic" | "explicit";
	explicitValues?: number[]; // Used for "explicit" mode
	targetValue: string | number;
	allowInterpolation: boolean; // If not allowed, will only use values provided.
	applyContext: boolean;
}

export interface PromptGenString extends SingleValueGenString {
	type: typeof GenStringType.Prompt;
	soap?: (generatedResult: string) => string; // For any post-processing.
}

export type GenString = string | BaseGenString;


// -- GENSTRING GENERATION -- //

// TODO: Potential performance improvement could come from pre-embedding GuidelineRangeGenString values and simply providing an ID later down the line that could be used to access those embeddings. If performance is bad in this initial prototype, consider doing that.

/**
 * Generates a string based on a generation configuration (a GenString).
 * @param s The GenString to generate.
 * @param userContextCandidates Any strings that users have provided that should be used to extract possible contexts.
 * @param imageContextCandidates Paths/URLs to any images users have generated that should be used to extract possible contexts.
 * @param systemContextCandidates Any strings that the system has exposed to users (e.g., previous instructions, whether manually written or generated) that should be used to extract possible contexts.
 * @param logger The Logger object for the current game session, to use for filling in blanks in templates. // TODO: Replace this with something incorporated in Redux state; should be at the top level outside of game and gameV2.
 * @param blankTransformers Transforms any form-element-based blanks, e.g., for transforming numerical inputs like sliders into strings using some logic.
 * @returns 
 */
export async function generateString(s: GenString, userContextCandidates?: string[], imageContextCandidates?: string[], systemContextCandidates?: string[], logger?: Logger, blankTransformers?: BlankTransformers): Promise<string> {
	// Simply return static strings, they need not be modified
	if (typeof s === "string") {
		return s;
	}

	switch (s.type) {
		case GenStringType.Static: {
			return (s as SingleValueGenString).value;
		}
		
		case GenStringType.Template: {
			let formFilled = fillPrompt((s as SingleValueGenString).value, blankTransformers, logger);
			// First, see if there's any context to fill in. If not, we're done.
			let hasContextCandidates = (userContextCandidates && userContextCandidates.length > 0)
				&& (imageContextCandidates && imageContextCandidates.length > 0)
				&& (systemContextCandidates && systemContextCandidates.length > 0);
			if (formFilled.indexOf("{context}") < 0 || !hasContextCandidates) {
				return formFilled;
			}
			// Only for template, we can retrieve context separately. This is because for other types, we want the context discovery + generation processes to be coupled on the backend, such that the best generated string can be selected (it's possible that the best context won't create the best question)
			// TODO: Error handling??? Or do that outside of this? The latter makes more sense.
			const response = await fetch(`${API_BASE_URL}/discoverContexts`, {
				method: 'POST',
				body: JSON.stringify({
					userContextCandidates,
					imageContextCandidates,
					systemContextCandidates,
					topN: 1,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			const topContext = data.values[0];
			// TODO: Use NLP algos to make sure that blanks get filled in a way that makes sense grammatically; this should probably just be moved to the backend
			let result = formFilled.replace("{context}", topContext);
			return result;
		}

		case GenStringType.Guideline: {
			const response = await fetch(`${API_BASE_URL}/applyContexts`, {
				method: 'POST',
				body: JSON.stringify({
					guideline: (s as SingleValueGenString).value,
					userContextCandidates,
					imageContextCandidates,
					systemContextCandidates,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			const result = data.value;
			return result;
		}

		case GenStringType.GuidelineRange: {
			const _s = s as GuidelineRangeGenString;
			const response = await fetch(`${API_BASE_URL}/applyContextsToRange`, {
				method: 'POST',
				body: JSON.stringify({
					guidelines: _s.value,
					compareMode: _s.compareMode,
					explicitValues: _s.explicitValues,
					targetValue: _s.targetValue,
					allowInterpolation: _s.allowInterpolation,
					applyContext: _s.applyContext,
					userContextCandidates: _s.applyContext ? userContextCandidates : undefined,
					imageContextCandidates: _s.applyContext ? imageContextCandidates : undefined,
					systemContextCandidates: _s.applyContext ? systemContextCandidates : undefined,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			const result = data.value;
			return result;
		}

		case GenStringType.Prompt: {
			const response = await fetch(`${API_BASE_URL}/genUFPrompt`, {
				method: 'POST',
				body: JSON.stringify({
					prompt: (s as SingleValueGenString).value,
					userContextCandidates,
					imageContextCandidates,
					systemContextCandidates,
				}),
				headers: {
					'Content-Type': 'appliation/json',
				},
			});
			const data = await response.json();
			const result = data.value;
			return result;
		}

		default: {
			throw new Error(`Attempted to generate GenString with invalid type "${s.type}."`);
		}
	}
}
