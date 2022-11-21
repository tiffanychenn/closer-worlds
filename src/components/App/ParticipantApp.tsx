import * as React from "react";
import { Logger } from "../../data/logger";
import { store } from "../../store/store";
import LongTextBox from "../atoms/input/LongTextBox";
import RadioButton from "../atoms/input/RadioButton";
import ShortTextBox from "../atoms/input/ShortTextBox";
import { Slider } from "../atoms/input/Slider";
import { Button } from "../atoms/input/Button";
import { BackgroundImage } from "../atoms/image/BackgroundImage";
import { ImageCard } from "../atoms/image/ImageCard";
import { renderBoldText } from "../../utils/textUtils";
import { DisplayGeneratedImage } from "../templates/DisplayGeneratedImage";
import { ImageStep, InfoStep, ReflectStep, RoleSelectStep, StoryStepType, WritePromptStep } from "../../data/story";
import { WritePrompt } from "../templates/WritePrompt";
// import { TEST_STORY_DATA } from "./storyData";
import { Reflect } from "../templates/Reflect";
import ConnectedStorySlide from "../pages/ConnectedStorySlide";
import { LimitedTextBox } from "../organisms/LimitedTextBox";
import { Panel } from "../atoms/containers/Panel";
import { DiscussionPrompt, Hint, PageHeader, Text, TextSpacer, Warning } from "../atoms/text/Text";
import { PlayerTokenHeader } from "../molecules/PlayerTokenHeader";
import { LoadingImageCard } from "../organisms/LoadingImageCard";
import { RadioGroup } from "../atoms/input/RadioGroup";
import { Tag, TagInput } from "../atoms/input/Tag";
import { ButtonPanel } from "../molecules/ButtonPanel";
import { STORY_DATA } from "./storyData";
import { InfoSlide } from "../templates/InfoSlide";
import { TagGroup } from "../atoms/input/TagGroup";
import { RoleSelectSlide } from "../templates/RoleSelectSlide";

export const DEBUG_MODE = true;

export default class ParticipantApp extends React.Component<{}> {
	private logger: Logger;

	constructor() {
		super({});
		this.logger = new Logger((entries, timesPerId) => {
			console.log(entries, timesPerId);
		}); // TODO: Write a storeData function that's probably just calling a thunk to send the data to a server, or saving to a cookie.
	}

	render() {
		return <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
			<ConnectedStorySlide logger={this.logger}/>
		</div>;
	}
}
