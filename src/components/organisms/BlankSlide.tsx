import * as React from 'react';
import { StoryStep } from '../../data/story';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { SlideBackground } from '../molecules/SlideBackground';

interface Props {
	children: React.ReactNode;
	step: StoryStep;
	sectionImageUrls: SectionImageUrls;
	onTimeout?: () => void;
	blurBG: boolean;
	overlayBG: boolean;
}

// NOTE: This class does not include a "next" button or a timer tooltip! This is because
// it should be unopinionated about the location of those items. I could alternatively
// make all children component factories that take the timer and next button as
// options, but I don't think that makes much sense.
export class BlankSlide extends React.Component<Props> {
	static defaultProps = { blurBG: true, overlayBG: true };

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
		const { children, step, sectionImageUrls, blurBG, overlayBG } = this.props;

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
			margin: '40px',
		};

		return <div style={pageStyle}>
			<SlideBackground bgInfo={step} sectionImageUrls={sectionImageUrls} blur={blurBG} overlay={overlayBG}/>
			<div style={contentStyle}>
				{children}
			</div>
		</div>;
	}
}
