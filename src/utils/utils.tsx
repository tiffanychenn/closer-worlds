import { API_BASE_URL } from "../actions/apiActions";
import { CONTROL_STORY_DATA, EXPERIMENTAL_STORY_DATA } from "../components/App/storyData";
import { SectionImageUrls } from "../reducers/promptReducer";

export function getStoryStep(sectionIndex: number, stepIndex: number, experimentType: string) {
	const STORY_DATA = experimentType === "Experimental" ? EXPERIMENTAL_STORY_DATA : CONTROL_STORY_DATA;
	if (STORY_DATA[sectionIndex]) {
		return STORY_DATA[sectionIndex].steps[stepIndex];
	} else {
		return undefined;
	};
}

export function imagePathToUrl(path: string) {
	if (path.substring(0, 4) == 'http' || path[0] == '#') {
		return path;
	}
	return `${API_BASE_URL}/client/data/${path}`;
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

// TODO: Add type annotations. I did this somewhat lazily--wasn't sure how to specify
// that the first param will have keys that are a subset of the second param's keys,
// but the types corresponding to each key will be the same.
/**
 * Applies default values to an object with a subset of the default object's keys. Helpful for managing options/configurations.
 * @param objWithOptionalValues The object to which to transfer any missing values. Should contain a subset of defaultValues's members.
 * @param defaultValues The default values.
 * @returns An object with the same keys as defaultValues with all undefined values copied over.
 */
export function applyMissingDefaults(objWithOptionalValues: any, defaultValues: any) {
	let result = Object.keys(defaultValues).map(key => objWithOptionalValues[key] === undefined ? defaultValues[key] : objWithOptionalValues[key]);
	return result;
}
