import * as React from 'react';
import { Logger } from '../../data/logger';
import { WritePromptStep } from '../../data/story';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { Button } from '../atoms/input/Button';
import { BackgroundImage } from '../atoms/image/BackgroundImage';
import { BLUE_BG_LIGHT_SHADOW, ImageCard, IMG_BG_DARK_SHADOW } from '../atoms/image/ImageCard';
import { DiscussionPrompt, Hint, PageHeader, Text, TIMEOUT_WARNING_TEXT, Warning } from '../atoms/text/Text';
import { PlayerTokenHeader } from '../molecules/PlayerTokenHeader';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { getSectionImageOrString } from '../../utils/utils';
import { BlankTwoColumnSlide } from '../organisms/BlankTwoColumnSlide';
import { BlankSlide } from '../organisms/BlankSlide';
import { ButtonData, ButtonPanel } from '../molecules/ButtonPanel';
import { LimitedTextBox } from '../organisms/LimitedTextBox';

interface Props {
	logger: Logger;
	step: WritePromptStep;
	landscapePlayer: 1 | 2;
	sectionImageUrls: SectionImageUrls;
	onNext?: () => void;
}

interface State {
	isOverLimit: boolean;
	hasText: boolean;
	hasTimedOut: boolean;
}

export class WritePrompt extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isOverLimit: false,
			hasText: false,
			hasTimedOut: false
		};
	}

	private onTimeout() {
		this.setState({ hasTimedOut: true });
	}

	private onLimitEdge(overLimit: boolean) {
		this.setState({ isOverLimit: overLimit });
	}

	private onInput(value: string) {
		this.setState({ hasText: value.length > 0 });
	}

	render() {
		const { logger, step, landscapePlayer, sectionImageUrls, onNext } = this.props;
		const { isOverLimit, hasText, hasTimedOut } = this.state;
		const playerNumber = playerRoleToNumber(step.player, landscapePlayer);

		const cardImage = getSectionImageOrString(step.cardImage, sectionImageUrls);
		const boxShadow = typeof step.backgroundImage == 'number' ? IMG_BG_DARK_SHADOW : BLUE_BG_LIGHT_SHADOW;
		const bgOpacity = typeof step.backgroundImage == 'number' ? 0.8 : 0.4;

		const allowNext = hasText && !isOverLimit;
		const nextButton: ButtonData = {
			id: step.id + '-next-button',
			text: 'Next',
			onClick: onNext,
			disabled: !allowNext,
		};

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

		const content = <div style={containerStyle}>
			<PlayerTokenHeader player={playerNumber}>{replacePlayerText(step.playerAction, playerNumber)}</PlayerTokenHeader>
			<ButtonPanel logger={logger} bgOpacity={bgOpacity} buttons={[nextButton]} showTimeout={hasTimedOut}>
				<div style={contentStyle}>
					<PageHeader>{replacePlayerText(step.title, playerNumber)}</PageHeader>
					<Text>{renderBoldText(replacePlayerText(step.instructions, playerNumber))}</Text>
					{step.hint && <Hint>{renderBoldText(replacePlayerText(step.hint, playerNumber))}</Hint>}
					<LimitedTextBox logger={logger}
									id={step.id + '-blank'}
									length="long"
									charLimit={step.charLimit}
									wordLimit={step.wordLimit}
									placeholder={step.exampleText}
									onLimitEdge={x => this.onLimitEdge(x)}
									onInput={x => this.onInput(x)}/>
				</div>
			</ButtonPanel>
		</div>;

		// Two-column layout for images
		if (cardImage) {
			return <BlankTwoColumnSlide step={step}
										sectionImageUrls={sectionImageUrls}
										onTimeout={() => this.onTimeout()}>{{
				col1: content,
				col2: <ImageCard src={cardImage} size="100%" boxShadow={boxShadow}/>,
			}}</BlankTwoColumnSlide>;
		}

		// One-column layout for no image
		return <BlankSlide step={step}
						   sectionImageUrls={sectionImageUrls}
						   onTimeout={() => this.onTimeout()}>
			{content}
		</BlankSlide>
	}
}
