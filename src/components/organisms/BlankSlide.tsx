import * as React from 'react';
import { StoryStep } from '../../data/story';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { SlideBackground } from '../molecules/SlideBackground';

interface Props {
	children: React.ReactNode;
	step: StoryStep;
	sectionImageUrls: SectionImageUrls;
	onTimeout?: () => void;
}

export class BlankSlide extends React.Component<Props> {
	componentDidMount() {
		if (this.props.step.timeLimitMs && this.props.step.timeLimitMs > 0) {
			setTimeout(() => {
				if (this.props.onTimeout) {
					this.props.onTimeout();
				}
			}, this.props.step.timeLimitMs);
		}
	}

	render() {
		const { children, step, sectionImageUrls } = this.props;

		const pageStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0, left: 0,
			width: '100%',
			height: '100%',
			background: '#050610',
		};
		const contentStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0, left: 0, bottom: 0, right: 0,
			margin: '40px auto',
			padding: '0 40px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			maxWidth: '1800px', 
		};

		return <div style={pageStyle}>
			<SlideBackground bgInfo={step} sectionImageUrls={sectionImageUrls}/>
			<div style={contentStyle}>
				{children}
			</div>
		</div>;
	}
}
