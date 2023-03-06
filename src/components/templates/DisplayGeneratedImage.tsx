import * as React from 'react';
import { Logger } from '../../data/logger';
import { ImageStep } from '../../data/story';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { getSectionImageOrString } from '../../utils/utils';
import { STAR_BG } from '../App/storyData';
import { Panel } from '../atoms/containers/Panel';
import { BLUE_BG_LIGHT_SHADOW, ImageCard, IMG_BG_DARK_SHADOW } from '../atoms/image/ImageCard';
import { Button } from '../atoms/input/Button';
import { PageHeader, Error as TextError } from '../atoms/text/Text';
import { BlankTwoColumnSlide } from '../organisms/BlankTwoColumnSlide';

interface Props {
	logger: Logger;
	step: ImageStep;
	sectionImageUrls: SectionImageUrls;
	onNext?: () => void;
	onRedo?: () => void;
	allowRedo: boolean;
	error: string;
}

export class DisplayGeneratedImage extends React.Component<Props> {
	static defaultProps = { allowRedo: true };

	render() {
		const { logger, step, sectionImageUrls, onNext, onRedo, allowRedo, error } = this.props;

		let cardImage = getSectionImageOrString(step.cardImage, sectionImageUrls);
		if (!cardImage) {
			throw new Error(`DisplayGeneratedImage received no image to display for card image: ${step.cardImage}`);
		}

		const bgOpacity = step.backgroundImage == STAR_BG ? 0.4 : 0.8;
		const boxShadow = step.backgroundImage == STAR_BG ? BLUE_BG_LIGHT_SHADOW : IMG_BG_DARK_SHADOW;

		const containerStyle: React.CSSProperties = {
			height: '85vh',
			width: '450px',
		};

		const contentStyle: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			top: 0, left: 0, right: 0, bottom: 0,
			padding: '40px',
			boxSizing: 'border-box',
			textAlign: 'center',
			gap: '10px',
		};

		const buttonsStyle: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: '20px',
		};

		return <BlankTwoColumnSlide step={step}
									sectionImageUrls={sectionImageUrls}
									flexCol1="0" flexCol2="0"
									justifyContent='center'>{{
			col1: <ImageCard src={cardImage} size='85vh' maxOtherSize='85vh' sizeSide='width' boxShadow={boxShadow}/>,
			col2: <div style={containerStyle}>
				<TextError>{error}</TextError>
				<Panel bgOpacity={bgOpacity} scroll={false}>
					<div style={contentStyle}>
						<PageHeader>All around you, the world has changed.</PageHeader>
						<div style={{height: '30px'}}></div>
						<Button id={step.id + '-next-button'} logger={logger} text="Next" onClick={onNext}/>
					</div>
				</Panel>
			</div>,
		}}</BlankTwoColumnSlide>;
	}
}
