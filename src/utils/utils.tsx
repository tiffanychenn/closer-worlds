import { STORY_DATA } from "../components/App/storyData";
import { Logger } from "../data/logger";

export function getStoryStep(sectionIndex: number, stepIndex: number) {
	if (STORY_DATA[sectionIndex]) {
		return STORY_DATA[sectionIndex].steps[stepIndex];
	} else {
		return undefined;
	};
}
