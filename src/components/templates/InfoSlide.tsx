import * as React from 'react';
import { Logger } from '../../data/logger';
import { InfoStep } from '../../data/story';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { BLUE_BG_LIGHT_SHADOW, ImageCard, IMG_BG_DARK_SHADOW } from '../atoms/image/ImageCard';
import { Hint, PageHeader, Text, Error } from '../atoms/text/Text';
import { PlayerTokenHeader } from '../molecules/PlayerTokenHeader';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { getSectionImageOrString } from '../../utils/utils';
import { STAR_BG } from '../App/storyData';
import { ButtonData, ButtonPanel } from '../molecules/ButtonPanel';
import { BlankTwoColumnSlide } from '../organisms/BlankTwoColumnSlide';
import { BlankSlide } from '../organisms/BlankSlide';

interface Props {
	logger: Logger;
	step: InfoStep;
	sectionImageUrls: SectionImageUrls;
	landscapePlayer: 1 | 2;
	onNext?: () => void;
    onBack?: () => void;
    error: string;
}

interface State {
	hasTimedOut: boolean;
}

export class InfoSlide extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasTimedOut: false };
	}

	render() {
		const { logger, step, sectionImageUrls, onNext, onBack, landscapePlayer, error } = this.props;
		const { hasTimedOut } = this.state;

		const cardImage = getSectionImageOrString(step.cardImage, sectionImageUrls);
		const bgOpacity = step.backgroundImage == STAR_BG ? 0.4 : 0.8;
		const boxShadow = step.backgroundImage == STAR_BG ? BLUE_BG_LIGHT_SHADOW : IMG_BG_DARK_SHADOW;

		const playerNumber = step.player ? playerRoleToNumber(step.player, landscapePlayer) : undefined;

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
			maxWidth: cardImage ? undefined : 'max(50vw, 600px)',
		};

		const nextButton: ButtonData = {
			id: step.id + '-next-button',
			text: 'Next',
			onClick: onNext,
		};
        const backButton: ButtonData = {
			id: step.id + '-back-button',
			text: 'Back',
			onClick: onBack,
			useOutlineStyle: true,
		};
		const buttons: ButtonData[] = [];
		if (!step.hideBack) buttons.push(backButton);
		if (!step.hideNext) buttons.push(nextButton);

		const content = <div style={containerStyle}>
            <Error>{error}</Error>
			{playerNumber && <PlayerTokenHeader player={playerNumber}>{replacePlayerText(step.playerAction, playerNumber)}</PlayerTokenHeader>}
			<ButtonPanel logger={logger} bgOpacity={bgOpacity} buttons={buttons} showTimeout={hasTimedOut}>
				<div style={contentStyle}>
					{step.title && <PageHeader>{replacePlayerText(step.title, playerNumber)}</PageHeader>}
					<Text>{renderBoldText(replacePlayerText(step.instructions, playerNumber))}</Text>
					{step.hint && <Hint>{renderBoldText(replacePlayerText(step.hint, playerNumber))}</Hint>}
				</div>
			</ButtonPanel>
		</div>;

		let imageContent = undefined;
		if (cardImage) {
			imageContent = <ImageCard src={cardImage} size="100%" boxShadow={boxShadow} contain={step.cardImageFit}/>;
		} else if (step.images && step.images.length > 0) {
			const imageGridStyle: React.CSSProperties = {
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: '1fr 1fr',
				gap: '30px',
				position: 'relative',
			};
			const imageStyle: React.CSSProperties = {
				width: '100%',
				height: '100%',
			};
			imageContent = <div style={imageGridStyle}>{step.images.map(src => <img src={src} style={imageStyle}/>)}</div>
		}

		if (imageContent) {
			return <BlankTwoColumnSlide step={step}
										sectionImageUrls={sectionImageUrls}
										onTimeout={() => this.setState({hasTimedOut: true})}>{{
				col1: content,
				col2: imageContent,
			}}</BlankTwoColumnSlide>
		}

		return <BlankSlide step={step}
						   sectionImageUrls={sectionImageUrls}
						   onTimeout={() => this.setState({hasTimedOut: true})}>
			{content}
		</BlankSlide>;
	}
}
