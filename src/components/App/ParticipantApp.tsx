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
import { ImageStep, InfoStep, ReflectStep, StoryStepType, WritePromptStep } from "../../data/story";
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
			{/* <BackgroundImage src="https://images.nightcafe.studio/jobs/24JEyUeOhCuirWEDRNil/24JEyUeOhCuirWEDRNil_4x.jpg?tr=w-1600,c-at_max"
							 blur="15px" overlayColor="linear-gradient(#1C262E, #050610)" overlayOpacity={0.8}/>
			<div style={{position: 'absolute', top: 0, left: 0, margin: '40px'}}>
				<ShortTextBox id="test-text-box" logger={this.logger} placeholder="Testing..."/>
				<Slider id="test-slider" logger={this.logger} leftLabel="low" rightLabel="high"/>
				<LongTextBox id="test-long-text" logger={this.logger} placeholder="Testing..."/>
				<RadioButton id="test-radio-button" logger={this.logger} label="Test"/>
				<Button text="yes" id="test-button" logger={this.logger}/>
				<p style={{width: '200px'}}>{renderBoldText("This is a *test* of how rendering *bold text* works! Let's see *if it can handle all this goodness, folks!* Right? *Right back at'cha.*")}</p>
				<br/><br/>
				<ImageCard src="https://cdnb.artstation.com/p/assets/images/images/051/898/687/large/luke-wells-luke-wells-landscape-midjourney.jpg"/>
			</div> */}

			{/* <DisplayGeneratedImage logger={this.logger}
								   step={{id: 'test-image', type: StoryStepType.Image, cardImage: 'https://cdnb.artstation.com/p/assets/images/images/051/898/687/large/luke-wells-luke-wells-landscape-midjourney.jpg', backgroundImage: 'https://cdnb.artstation.com/p/assets/images/images/051/898/687/large/luke-wells-luke-wells-landscape-midjourney.jpg'}}
								   sectionImageUrls={[]}
								   onNext={() => {}}
								   onRedo={() => {}}/> */}

			{/* <WritePrompt logger={this.logger}
						 step={TEST_STORY_DATA[0].steps[0] as WritePromptStep}
						 landscapePlayer={1}
						 sectionImageUrls={[]}
						 onNext={() => {}}/> */}

			{/* <Reflect logger={this.logger}
					 step={TEST_STORY_DATA[0].steps[1] as ReflectStep}
					 landscapePlayer={1}
					 sectionImageUrls={[]}
					 allowNext={true}
					 onNext={() => {}}/> */}
			{/* <BackgroundImage src="./assets/stars_bg_16.png"/>
			<ConnectedStorySlide logger={this.logger}/> */}

			{/* <LimitedTextBox id="test-limited-textbox"
							logger={this.logger}
							placeholder="Type something!"
							length="long"
							charLimit={20}
							onLimitEdge={overLimit => console.log(`overLimit: ${overLimit}`)}/> */}

			{/* <BackgroundImage src="./assets/stars_bg_16.png"/>
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, margin: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
				<PlayerTokenHeader player={1}>Read out loud</PlayerTokenHeader>
				<Panel>
					<PageHeader>This is a page header:</PageHeader>
					<TextSpacer/>
					<Text>This is some text.</Text>
					<TextSpacer/>
					<Hint>This is a hint.</Hint>
					<TextSpacer/>
					<Warning>This is a warning.</Warning>
					<TextSpacer/>
					<DiscussionPrompt>Player 1, please complete this action item.</DiscussionPrompt>
					<TextSpacer/>
					<ShortTextBox id="test-short" logger={this.logger} placeholder="e.g., pink fluffy clouds and lots of trees"/>
					<TextSpacer/>
					<LongTextBox id="test-short" logger={this.logger} placeholder="e.g., pink fluffy clouds and lots of trees"/>
					<TextSpacer/>
					<RadioGroup id="test-radio-group" logger={this.logger}
								ids={['test-radio-1', 'test-radio-2']}
								labels={['Player 1', 'Player 2']}
								orientation="horizontal"/>
					<TextSpacer/>
					<Slider id="test-slider" logger={this.logger} leftLabel="Not at all" rightLabel="Super accurate"/>
					<TextSpacer/>
					<Button id="test-button" logger={this.logger} text="Next"/>
					<Tag id="test-tag" logger={this.logger} text="realistic" />
				</Panel>
				<LoadingImageCard src="https://cdnb.artstation.com/p/assets/images/images/051/898/687/large/luke-wells-luke-wells-landscape-midjourney.jpg" size="50%" allowNext={false} onNext={() => {}} buttonId="test-image-button" logger={this.logger}/>
			</div> */}

			<BackgroundImage src="./assets/stars_bg_16.png"/>
			<ButtonPanel logger={this.logger} buttons={[{
				id: 'test-next-button',
				text: 'Next',
			}, {
				id: 'test-redo-button',
				text: 'Redo',
				useOutlineStyle: true,
			}]}>
				<PageHeader>This is a page header:</PageHeader>
				<TextSpacer/>
				<Text>This is some text.</Text>
				<TextSpacer/>
				<Hint>This is a hint.</Hint>
				<TextSpacer/>
				<Warning>This is a warning.</Warning>
				<TextSpacer/>
				<DiscussionPrompt>Player 1, please complete this action item.</DiscussionPrompt>
				<TextSpacer/>
				<LongTextBox id="test-long" logger={this.logger} placeholder="e.g., pink fluffy clouds and lots of trees"/>
				<TextSpacer/>
				<RadioGroup id="test-radio-group" logger={this.logger}
							ids={['test-radio-1', 'test-radio-2']}
							labels={['Player 1', 'Player 2']}
							orientation="horizontal"/>
				<TextSpacer/>
				<Slider id="test-slider" logger={this.logger} leftLabel="Not at all" rightLabel="Super accurate"/>
				{/* <Tag id="test-tag" logger={this.logger} text="test"/>
				<TagInput id="test-tag-input" logger={this.logger} placeholder="other..."/> */}
				<TextSpacer/>
				<TagGroup id="test-tags" logger={this.logger} tags={['hello', 'world']} includeInput={true}/>
			</ButtonPanel>

			{/* <WritePrompt logger={this.logger} step={STORY_DATA[1].steps[0] as WritePromptStep} landscapePlayer={1} sectionImageUrls={[]}/> */}
			{/* <Reflect logger={this.logger} step={STORY_DATA[1].steps[1] as ReflectStep} landscapePlayer={1} sectionImageUrls={[]} allowNext={true}/> */}
			{/* <DisplayGeneratedImage logger={this.logger} step={STORY_DATA[1].steps[2] as ImageStep} sectionImageUrls={[]}/> */}
			{/* <InfoSlide logger={this.logger} step={STORY_DATA[0].steps[1] as InfoStep} sectionImageUrls={[]} landscapePlayer={1}/> */}
		</div>;
	}
}
