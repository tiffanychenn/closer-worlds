import * as React from 'react';
import { Logger } from '../../data/logger';
import { ReflectStep } from '../../data/story';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { Hint, SerifHeader, Text } from '../atoms/text/Text';
import { ContentWithImageSlide } from '../organisms/ContentWithImageSlide';

interface Props {
	logger: Logger;
	step: ReflectStep;
	landscapePlayer: 1 | 2;
	sectionImageUrls: { [sectionIndex: number]: string };
	onNext: () => void;
	allowNext: boolean; // Delegated up to parent because of DALL-E and possible socket callback.
}

export class Reflect extends React.Component<Props> {
	render() {
		const { logger, step, landscapePlayer, sectionImageUrls, onNext, allowNext } = this.props;
		const playerNumber = playerRoleToNumber(step.player, landscapePlayer);

		// TODO: Again, styles! What I have below is temporary, and probably also will change
		// if we include an image card in reflect slides.
		return <ContentWithImageSlide step={step} sectionImageUrls={sectionImageUrls} onNext={onNext} allowNext={allowNext} logger={logger}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				gap: '60px',
				minHeight: '61vh',
			}}>
				<div>
					<Text>The wand starts swirling and whirling, and begins to frantically paint the landscape.<br/>While you wait...</Text>
					<SerifHeader>{renderBoldText(replacePlayerText(step.question, playerNumber))}</SerifHeader>
				</div>
				<div>
					{/* TODO: Add spinner */}
					<Hint>Generating...</Hint>
				</div>
			</div>
		</ContentWithImageSlide>;
	}
}
