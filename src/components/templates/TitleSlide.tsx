import * as React from 'react';
import { Logger } from '../../data/logger';
import { TitleStep } from '../../data/story';
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
import { BlankSlide } from '../organisms/BlankSlide';
import { initExperiment } from '../../actions/promptActions';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	logger: Logger;
	step: TitleStep;
	onNext: () => void;
}

export class TitleSlide extends React.Component<Props> {
	render() {
		const { logger, step, onNext } = this.props;

		const headingStyle:  React.CSSProperties = {
			fontFamily: 'Sono',
			color: "white",
			margin: "auto",
			fontWeight: 400,
		}

		const onClick = async () => {
			const experimentId = uuidv4();
			const firstPlayerId = uuidv4();
			const secondPlayerId = uuidv4();
			initExperiment(experimentId, firstPlayerId, secondPlayerId);
			onNext();
		}
		
		// TODO: Properly style the mess below, haha.
		// TODO: The background color used below when there's no background image is highly arbitrary and subject to change. Be sure to change it!
		// TODO: Change allowNext to actually reflect whether next should be allowed. Add state.
		return <BlankSlide step={step} sectionImageUrls={[]}>
			<h1 style={headingStyle}>Dreamy</h1>
			<Button id="start-button" logger={logger} text="START" onClick={onClick}></Button>
		</BlankSlide>
	}
}
