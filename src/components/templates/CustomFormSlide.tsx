import * as React from 'react';
import { Logger } from '../../data/logger';
import { CustomFormStep } from '../../data/story';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { getSectionImageOrString } from '../../utils/utils';
import { STAR_BG } from '../App/storyData';
import { GAP_WITHIN_QUESTIONS } from '../atoms/containers/QuestionGroup';
import { BLUE_BG_LIGHT_SHADOW, ImageCard, IMG_BG_DARK_SHADOW } from '../atoms/image/ImageCard';
import { ButtonData, ButtonPanel } from '../molecules/ButtonPanel';
import { PlayerTokenHeader } from '../molecules/PlayerTokenHeader';
import { BlankSlide } from '../organisms/BlankSlide';
import { BlankTwoColumnSlide } from '../organisms/BlankTwoColumnSlide';
import { Error } from '../atoms/text/Text';

interface Props {
	logger: Logger;
	step: CustomFormStep;
	landscapePlayer: 1 | 2;
	sectionImageUrls: SectionImageUrls;
	onNext?: () => void;
	onBack?: () => void;
	error: string;
}

interface State {
	hasTimedOut: boolean;
}

export class CustomFormSlide extends React.Component<Props, State> {
	private listenerId: string;
	
	constructor(props: Props) {
		super(props);
		this.state = { hasTimedOut: false };
		this.listenerId = `CUSTOM_FORM_${Date.now()}`;
	}

	private onTimeout() {
		this.setState({ hasTimedOut: true });
	}

	componentDidMount() {
		// Ensure that allowNext gets updated whenever a required logger value does.
		this.props.logger.addListener(this.listenerId, id => {
			if (this.props.step.requiredFormElemIds.indexOf(id) >= 0) {
				this.forceUpdate();
			}
		});
		this.forceUpdate();
	}

	componentWillUnmount() {
		this.props.logger.removeListener(this.listenerId);
	}
	
	render() {
		const { logger, step, landscapePlayer, sectionImageUrls, onNext, onBack, error } = this.props;
		const { hasTimedOut } = this.state;
		const playerNumber = step.player ? playerRoleToNumber(step.player, landscapePlayer) : undefined;

		const cardImage = getSectionImageOrString(step.cardImage, sectionImageUrls);
		const bgOpacity = step.backgroundImage == STAR_BG ? 0.4 : 0.8;
		const boxShadow = step.backgroundImage == STAR_BG ? BLUE_BG_LIGHT_SHADOW : IMG_BG_DARK_SHADOW;

		// Only allow next if all form elements have been filled out.
		const latestValues = logger.getLatestValues(step.requiredFormElemIds);
		let allowNext = true;
		for (let key in latestValues) {
			let val = latestValues[key];
			// TODO: Possibly extract this to an isEmpty function that covers all possible logger values.
			if (!val || val == "" || val == "[]") {
				// TODO: We might also want to check that the value isn't special--i.e., it doesn't start with !, as in !click.
				allowNext = false;
				break;
			}
		}

		const nextButton: ButtonData = {
			id: step.id + '-next-button',
			text: 'Next',
			onClick: onNext,
			disabled: !allowNext,
		};
		const backButton: ButtonData = {
			id: step.id + '-back-button',
			text: 'Back',
			onClick: onBack,
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
			gap: step.itemSpacing ? step.itemSpacing : GAP_WITHIN_QUESTIONS,
			maxWidth: cardImage ? undefined
				: (step.maxWidthIfNoImageCard === undefined ? 'max(50vw, 600px)'
					: (step.maxWidthIfNoImageCard === false ? undefined : step.maxWidthIfNoImageCard)),
		}

		const content = <div style={containerStyle}>
			<Error>{error}</Error>
			{playerNumber && <PlayerTokenHeader player={playerNumber}>{replacePlayerText(step.playerAction, playerNumber)}</PlayerTokenHeader>}
			<ButtonPanel logger={logger} bgOpacity={bgOpacity} buttons={[backButton, nextButton]} showTimeout={hasTimedOut}>
				<div style={contentStyle}>
					{step.makeContent(logger, hasTimedOut, text => renderBoldText(replacePlayerText(text, playerNumber)))}
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
			}}</BlankTwoColumnSlide>
		}

		// One-column layout for no image
		return <BlankSlide step={step}
						   sectionImageUrls={sectionImageUrls}
						   onTimeout={() => this.onTimeout()}>
			{content}
		</BlankSlide>;
	}
}
