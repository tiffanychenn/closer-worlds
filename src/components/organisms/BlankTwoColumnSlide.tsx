import * as React from 'react';
import { StoryStep } from '../../data/story';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { BlankSlide } from './BlankSlide';

interface Props {
	children: { col1: React.ReactNode, col2: React.ReactNode };
	step: StoryStep;
	sectionImageUrls: SectionImageUrls;
	onTimeout?: () => void;
	flexCol1: string | number;
	flexCol2: string | number;
	zIndex1: number;
	zIndex2: number;
	maxWidth1?: string;
	maxWidth2?: string;
}

export class BlankTwoColumnSlide extends React.Component<Props> {
	static defaultProps = {
		flexCol1: 1,
		flexCol2: 1,
		zIndex1: 1,
		zIndex2: 0,
	};

	render() {
		const { children: { col1, col2 }, step, sectionImageUrls, onTimeout, flexCol1, flexCol2, zIndex1, zIndex2, maxWidth1, maxWidth2 } = this.props;

		const containerStyle: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			flex: 2,
			alignItems: 'center',
			gap: '60px',
		};

		const col1Style: React.CSSProperties = {zIndex: zIndex1, flex: flexCol1};
		if (maxWidth1) col1Style.maxWidth = maxWidth1;
		const col2Style: React.CSSProperties = {zIndex: zIndex2, flex: flexCol2};
		if (maxWidth2) col2Style.maxWidth = maxWidth2;

		return <BlankSlide step={step} sectionImageUrls={sectionImageUrls} onTimeout={onTimeout}>
			<div style={containerStyle}>
				<div style={col1Style}>{col1}</div>
				<div style={col2Style}>{col2}</div>
			</div>
		</BlankSlide>
	}
}
