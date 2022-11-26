import * as React from 'react';
import { Logger } from '../../data/logger';
import { InfoStep, StoryStepType } from '../../data/story';
import { PLAIN_BG } from '../App/storyData';
import { InfoSlide } from './InfoSlide';

interface Props {
	logger: Logger;
	setIndex: number;
	questionIndex: number;
	question: string;
	onNext?: () => void;
	onBack?: () => void;
}

export class ControlQuestionSlide extends React.Component<Props> {
	render() {
		const { logger, question, setIndex, questionIndex, onNext, onBack } = this.props;
		const fakeStep: InfoStep = {
			type: StoryStepType.Info,
			id: `ff-s${setIndex}-q${questionIndex}`,
			title: "Answer this question:",
			instructions: question,
			player: questionIndex % 2 == 0 ? 1 : 2,
			playerAction: "It's your turn now",
			backgroundImage: PLAIN_BG,
			hideBack: questionIndex === 0,
		};
		return <InfoSlide logger={logger}
						  step={fakeStep}
						  sectionImageUrls={[]}
						  landscapePlayer={1}
						  onNext={onNext}
						  onBack={onBack}
						  error=""/>
	}
}
