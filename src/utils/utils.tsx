import { API_BASE_URL } from "../actions/apiActions";
import { STORY_DATA } from "../components/App/storyData";
import { Logger } from "../data/logger";
import { StoryStep } from "../data/story";
import { SectionImageUrls } from "../reducers/promptReducer";

export function getStoryStep(sectionIndex: number, stepIndex: number) {
	if (STORY_DATA[sectionIndex]) {
		return STORY_DATA[sectionIndex].steps[stepIndex];
	} else {
		return undefined;
	};
}

export function imagePathToUrl(path: string) {
	// FIXME: This might not work depending on how images are served.
	return `${API_BASE_URL}/${path}`;
}

export function spread<T>(iter: IterableIterator<T>): T[] {
	let arr: T[] = [];
	let curr = iter.next();
	while (!curr.done) {
		arr.push(curr.value);
		curr = iter.next();
	}
	return arr;
}

/**
 * Converts a step's image value to a path usable in image source values.
 * @param stepImgValue Either step.cardImage or step.backgroundImage.
 * @param sectionImageUrls Part of the global state.
 * @returns Either the path or an error value: false if there's no image, or undefined if there's an image but it couldn't be found.
 */
export function getSectionImageOrString(stepImgValue: string | number | undefined, sectionImageUrls: SectionImageUrls): string | false | undefined {
	if (!stepImgValue) return false;
	if (typeof stepImgValue == 'number') {
		if (!sectionImageUrls[stepImgValue]) return undefined;
		return imagePathToUrl(sectionImageUrls[stepImgValue].path);
	}
	return stepImgValue; // Otherwise, it's already a URL
}
