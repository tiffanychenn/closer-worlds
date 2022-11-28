import * as React from 'react';
import { Logger } from '../../data/logger';
import { ReflectStep } from '../../data/story';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { getSectionImageOrString } from '../../utils/utils';
import { STAR_BG } from '../App/storyData';
import { Panel } from '../atoms/containers/Panel';
import { BLUE_BG_LIGHT_SHADOW } from '../atoms/image/ImageCard';
import { DiscussionPrompt, Text, Error } from '../atoms/text/Text';
import { ButtonData, ButtonPanel } from '../molecules/ButtonPanel';
import { PlayerTokenHeader } from '../molecules/PlayerTokenHeader';
import { BlankTwoColumnSlide } from '../organisms/BlankTwoColumnSlide';
import { LoadingImageCardNoNext } from '../organisms/LoadingImageCardNoNext';

interface Props {
	logger: Logger;
	step: ReflectStep;
	landscapePlayer: 1 | 2;
	sectionImageUrls: SectionImageUrls;
	onNext?: () => void;
	allowNext: boolean; // Delegated up to parent because of DALL-E and possible socket callback.
	error: string;
}

export class Reflect extends React.Component<Props> {
	render() {
		const { logger, step, landscapePlayer, sectionImageUrls, onNext, allowNext, error } = this.props;
		const playerNumber = playerRoleToNumber(step.player, landscapePlayer);
		
		const cardImage = getSectionImageOrString(step.cardImage, sectionImageUrls);
		// const boxShadow = typeof step.backgroundImage == 'number' ? IMG_BG_DARK_SHADOW : BLUE_BG_LIGHT_SHADOW;
		// const bgOpacity = typeof step.backgroundImage == 'number' ? 0.8 : 0.4;
		const bgOpacity = step.backgroundImage == STAR_BG ? 0.4 : 0.8;
		// const boxShadow = step.backgroundImage == STAR_BG ? BLUE_BG_LIGHT_SHADOW : IMG_BG_DARK_SHADOW;
		const boxShadow = BLUE_BG_LIGHT_SHADOW;

		const containerStyle: React.CSSProperties = {
			height: '80vh',
			display: 'flex',
			flexDirection: 'column',
			gap: '20px',
			flex: 1,
		};

		const contentStyle: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'column',
			gap: '30px',
		};

		const nextButton: ButtonData = {
			id: step.id + '-next-button',
			text: 'Next',
			disabled: !allowNext,
			onClick: onNext,
		};
		const buttons: ButtonData[] = [nextButton];

		const content = <div style={containerStyle}>
			<Error>{error}</Error>
			{step.playerAction && <PlayerTokenHeader player={playerNumber}>{step.playerAction}</PlayerTokenHeader>}
			<ButtonPanel bgOpacity={bgOpacity}
						 logger={logger}
						 buttons={buttons}>
				<div style={contentStyle}>
					<Text>The wand starts swirling and whirling, and begins to frantically paint the landscape.</Text>
					<Text>While you wait...</Text>
					<DiscussionPrompt>{renderBoldText(replacePlayerText(step.question, playerNumber))}</DiscussionPrompt>
				</div>
			</ButtonPanel>
		</div>;

		// Two column layout always
		return <BlankTwoColumnSlide step={step}
									sectionImageUrls={sectionImageUrls}>{{
			col1: content,
			// col2: <LoadingImageCard src={cardImage as string}
			// 						allowNext={allowNext}
			// 						onNext={onNext}
			// 						buttonId={step.id + '-next-button'}
			// 						logger={logger}
			// 						boxShadow={boxShadow}/>
			col2: <LoadingImageCardNoNext
									src={cardImage as string}
									loading={!allowNext}
									buttonId={step.id + '-next-button'}
									logger={logger}
									boxShadow={boxShadow}/>
		}}</BlankTwoColumnSlide>;
	}
}
