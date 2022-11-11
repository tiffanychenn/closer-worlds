import * as React from 'react';
import { Logger } from '../../data/logger';
import { WritePromptStep } from '../../data/story';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { Button } from '../atoms/Button';
import { BackgroundImage } from '../atoms/image/BackgroundImage';
import { ImageCard } from '../atoms/image/ImageCard';
import LongTextBox from '../atoms/input/LongTextBox';
import { ActionItem, Hint, Text } from '../atoms/text/Text';
import { PlayerTokenHeader } from '../molecules/PlayerTokenHeader';

interface Props {
	logger: Logger;
	step: WritePromptStep;
	landscapePlayer: 1 | 2;
	sectionImageUrls: { [sectionIndex: number]: string };
	onNext: () => void;
}

export class WritePrompt extends React.Component<Props> {
	render() {
		const { logger, step, landscapePlayer, sectionImageUrls, onNext } = this.props;
		const playerNumber = playerRoleToNumber(step.player, landscapePlayer);

		const pageStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0, left: 0,
			width: '100%',
			height: '100%',
		};
		const contentStyle: React.CSSProperties = {};
		const imageStyle: React.CSSProperties = {};

		let backgroundUrl: string | false = false;
		if (step.backgroundImage) {
			if (typeof step.backgroundImage == 'number') {
				backgroundUrl = sectionImageUrls[step.backgroundImage];
			} else {
				backgroundUrl = step.backgroundImage;
			}
		}

		let cardUrl: string | false = false;
		if (step.cardImage) {
			if (typeof step.cardImage == 'number') {
				cardUrl = sectionImageUrls[step.cardImage];
			} else {
				cardUrl = step.cardImage;
			}
		}

		// TODO: Incorporate timer features.
		// TODO: Vary contentStyle's width based on whether there's an image.
		// TODO: Properly style the mess below, haha.

		// TODO: The background color used below when there's no background image is highly arbitrary and subject to change. Be sure to change it!
		return <div style={pageStyle}>
			{backgroundUrl ? <BackgroundImage src={backgroundUrl}/> : <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(#1C262E, #050610)'}}></div>}
			<div style={contentStyle}>
				<PlayerTokenHeader player={playerNumber}>{replacePlayerText(step.title, playerNumber)}</PlayerTokenHeader>
				<ActionItem>Read the following out loud.</ActionItem>
				<Text>{renderBoldText(replacePlayerText(step.instructions, playerNumber))}</Text>
				<Hint>Always feel free to discuss your ideas with your partners.</Hint> {/* TODO: Add ! icon before hint. */}
				<LongTextBox logger={logger} id={step.id + '-blank'} placeholder={step.exampleText}/>
				{/* TODO: Convert LongTextBox into something that monitors word and character limits, and responds accordingly. Use state to inform state of next button. */}
				{/* TODO: It's possible that in some cases, we'll want smaller text boxes or individual text boxes per word. We need to account for that, if that's the case. */}
				<Button onClick={onNext} text="Next"/>
			</div>
			{cardUrl && <div style={imageStyle}>
				<ImageCard src={cardUrl}/>
			</div>}
		</div>;
	}
}
