import * as React from 'react';
import { Logger } from '../../data/logger';
import { ImageStep } from '../../data/story';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { imagePathToUrl } from '../../utils/utils';
import { ImageCard } from '../atoms/image/ImageCard';
import { Button } from '../atoms/input/Button';
import { Text } from '../atoms/text/Text';
import { BlankSlide } from '../organisms/BlankSlide';

interface Props {
	logger: Logger;
	step: ImageStep;
	sectionImageUrls: SectionImageUrls;
	onNext: () => void;
	onRedo: () => void;
}

export class DisplayGeneratedImage extends React.Component<Props> {
	render() {
		const { logger, step, sectionImageUrls, onNext, onRedo } = this.props;

		const containerStyle: React.CSSProperties = {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'stretch',
			gap: '20px',
		};

		let cardUrl: string;
		if (step.cardImage) {
			if (typeof step.cardImage == 'number') {
				cardUrl = imagePathToUrl(sectionImageUrls[step.cardImage].path);
			} else {
				cardUrl = step.cardImage;
			}
		}

		return <BlankSlide step={step} sectionImageUrls={sectionImageUrls}>
			<div style={containerStyle}>
				<div style={{flex: 1, height: '100%', display: 'flex', justifyContent: 'flex-start'}}>
					<Text>All around you, the world has changed.</Text>
				</div>
				<ImageCard src={cardUrl} size='100%' sizeSide='height'/>
				<div style={{flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '10px'}}>
					<Button id={step.id + '-redo-button'} logger={logger} text="Redo image" onClick={onRedo}/>
					<Button id={step.id + '-next-button'} logger={logger} text="Next" onClick={onNext}/>
				</div>
			</div>
		</BlankSlide>;
	}
}
