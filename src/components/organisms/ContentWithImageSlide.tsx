import * as React from 'react';
import { Logger } from '../../data/logger';
import { StoryStep } from '../../data/story';
import { Button } from '../atoms/input/Button';
import { ImageCard } from '../atoms/image/ImageCard';
import { Hint } from '../atoms/text/Text';
import { BlankSlide } from './BlankSlide';
import { BlankTwoColumnSlide } from './BlankTwoColumnSlide';

interface Props {
	children: React.ReactNode;
	step: StoryStep;
	sectionImageUrls: { [sectionIndex: number]: string };
	onTimeout?: () => void;
	onNext?: () => void;
	allowNext: boolean;
	logger: Logger;
}

interface State {
	timerHasFinished: boolean;
}

export class ContentWithImageSlide extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			timerHasFinished: false,
		};
	}

	onTimeout() {
		this.setState({
			timerHasFinished: true
		}, () => this.props.onTimeout());
	}

	render() {
		const { children, step, sectionImageUrls, onNext, allowNext, logger } = this.props;
		const { timerHasFinished } = this.state;

		let cardUrl: string | false = false;
		if (step.cardImage) {
			if (typeof step.cardImage == 'number') {
				cardUrl = sectionImageUrls[step.cardImage];
			} else {
				cardUrl = step.cardImage;
			}
		}

		const nextSection = <div>
			<span><Button text="Next" onClick={onNext} logger={logger} id={step.id + "-next-button"}/></span>
			<span style={{
				opacity: timerHasFinished ? 1 : 0,
				transition: 'opacity 0.3s',
			}}><Hint>Time's up!</Hint></span>
			{/* TODO: Make this timer message a LOT nicer. Also, needs an icon still--see Hint for more info on that. */}
		</div>;

		if (cardUrl) {
			return <BlankTwoColumnSlide step={step} onTimeout={() => this.onTimeout()}
										sectionImageUrls={sectionImageUrls}>{{
				col1: <div>
					{children}
					{/* TODO: Make this spacing nicer--maybe something like a min height, and this button always goes to the bottom left. */}
					<div style={{height: '30px'}}></div>
					{/* TODO: Disable this button when !allowNext. */}
					{nextSection}
				</div>,
				col2: <ImageCard src={cardUrl} size="100%"/>
			}}</BlankTwoColumnSlide>
		}

		// Otherwise, use a one-column layout.
		return <BlankSlide step={step} onTimeout={() => this.onTimeout()}
						   sectionImageUrls={sectionImageUrls}>
			<div style={{
					position: 'absolute',
					top: '50%',
					transform: 'translateY(-50%)',
					width: '66%',
				}}>
				{children}
				{/* TODO: Make this spacing nicer--maybe something like a min height, and this button always goes to the bottom left. */}
				<div style={{height: '30px'}}></div>
				{/* TODO: Disable this button when !allowNext. */}
				{nextSection}
			</div>
		</BlankSlide>;
	}
}
