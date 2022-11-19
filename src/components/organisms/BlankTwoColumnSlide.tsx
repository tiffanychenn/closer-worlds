import * as React from 'react';
import { StoryStep } from '../../data/story';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { BlankSlide } from './BlankSlide';

interface Props {
	children: { col1: React.ReactNode, col2: React.ReactNode };
	step: StoryStep;
	sectionImageUrls: SectionImageUrls;
	onTimeout?: () => void;
}

export class BlankTwoColumnSlide extends React.Component<Props> {
	render() {
		const { children: { col1, col2 }, step, sectionImageUrls, onTimeout } = this.props;

		const containerStyle: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			gap: '40px',
		};
		const childStyle: React.CSSProperties = {
			flex: 1,
		};

		return <BlankSlide step={step} sectionImageUrls={sectionImageUrls} onTimeout={onTimeout}>
			<div style={containerStyle}>
				<div style={Object.assign({zIndex: 1}, childStyle)}>{col1}</div>
				<div style={childStyle}>{col2}</div>
			</div>
		</BlankSlide>
	}
}
