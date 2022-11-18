import * as React from 'react';
import { Logger } from '../../data/logger';
import { InfoStep } from '../../data/story';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { Button } from '../atoms/input/Button';
import { BackgroundImage } from '../atoms/image/BackgroundImage';
import { ImageCard } from '../atoms/image/ImageCard';
import LongTextBox from '../atoms/input/LongTextBox';
import { DiscussionPrompt, Hint, Text } from '../atoms/text/Text';
import { PlayerTokenHeader } from '../molecules/PlayerTokenHeader';
import { SlideBackground } from '../molecules/SlideBackground';
import { ContentWithImageSlide } from '../organisms/ContentWithImageSlide';
import { SectionImageUrls } from '../../reducers/promptReducer';

interface Props {
	logger: Logger;
	step: InfoStep;
	sectionImageUrls: SectionImageUrls;
	onNext: () => void;
}

export class InfoSlide extends React.Component<Props> {
	render() {
		const { logger, step, sectionImageUrls, onNext } = this.props;
		
		// TODO: Properly style the mess below, haha.
		// TODO: The background color used below when there's no background image is highly arbitrary and subject to change. Be sure to change it!
		// TODO: Change allowNext to actually reflect whether next should be allowed. Add state.
		return <ContentWithImageSlide step={step} sectionImageUrls={sectionImageUrls} onNext={onNext} allowNext={true} logger={logger}>
			<Hint>Always feel free to discuss your ideas with your partners.</Hint> {/* TODO: Add ! icon before hint. */}
			{/* TODO: Convert LongTextBox into something that monitors word and character limits, and responds accordingly. Use state to inform state of next button. */}
			{/* TODO: It's possible that in some cases, we'll want smaller text boxes or individual text boxes per word. We need to account for that, if that's the case. */}
		</ContentWithImageSlide>;
	}
}
