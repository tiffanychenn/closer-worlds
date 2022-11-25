import * as React from 'react';
import { connect } from 'react-redux';
import { advanceControlQuestion, advanceControlSet, redoControlQuestion, startControlQuestions } from '../../actions/controlActions';
import { Logger } from '../../data/logger';
import { StoryStepType } from '../../data/story';
import { State } from '../../reducers/rootReducer';
import { FAST_FRIENDS_DATA, PLAIN_BG } from '../App/storyData';
import { WarningNextModal } from '../molecules/WarningNextModal';
import { ControlQuestionSlide } from '../templates/ControlQuestionSlide';
import { InfoSlide } from '../templates/InfoSlide';

interface OwnProps {
	logger: Logger;
}

interface ReduxStateProps {
	setIndex: number;
	questionIndex: number;
	shouldStartNextSet: boolean;
	finishedAllQuestions: boolean;
	displayIntro: boolean;
}

interface ReduxDispatchProps {
	advanceControlQuestion: (logger: Logger, experimentId?: string, firstPlayerId?: string, secondPlayerId?: string) => void;
	redoControlQuestion: (logger: Logger) => void;
	advanceControlSet: (logger: Logger) => void;
	startControlQuestions: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

class ConnectedControl extends React.Component<Props> {
	render() {
		const { logger, setIndex, questionIndex, shouldStartNextSet, finishedAllQuestions, displayIntro, advanceControlQuestion, advanceControlSet, redoControlQuestion, startControlQuestions } = this.props;

		if (displayIntro) {
			return <InfoSlide logger={logger}
							  sectionImageUrls={[]}
							  landscapePlayer={1}
							  error=""
							  onNext={() => startControlQuestions()}
							  step={{
				type: StoryStepType.Info,
				id: 'ff-intro',
				backgroundImage: PLAIN_BG,
				hideBack: true,
				title: "Read the following out loud:",
				instructions: "This activity is about interpersonal closeness. Your task, which we think will be quite enjoyable, is simply to get close to your partner.\n\nIn alternating order, take turns reading questions that appear on screen. Read it *out loud*, carry out the activity, then move on when you are ready.",
			}}/>;
		}

		if (finishedAllQuestions) {
			return <InfoSlide logger={logger}
							  sectionImageUrls={[]}
							  landscapePlayer={1}
							  error=""
							  step={{
				type: StoryStepType.Info,
				id: 'ff-end',
				backgroundImage: PLAIN_BG,
				hideNext: true,
				hideBack: true,
				instructions: "Thank you for sharing and playing the game!\n\nThe end.",
			}}/>
		}

		return <>
			<ControlQuestionSlide logger={logger}
								  setIndex={setIndex}
								  questionIndex={questionIndex}
								  question={FAST_FRIENDS_DATA[setIndex].questions[questionIndex]}
								  onNext={() => advanceControlQuestion(logger)}
								  onBack={() => redoControlQuestion(logger)}/>
			<WarningNextModal logger={logger}
							  show={shouldStartNextSet}
							  warningTitle="Time's up!"
							  body={"Start wrapping up your answer to this question. When you're ready, click \"Next\" to continue."}
							  buttonId={`ff-s${setIndex}-next-button`}
							  onNext={() => advanceControlSet(logger)}/>
		</>;
	}
}

const mapStateToProps = (state: State): ReduxStateProps => ({
	setIndex: state.control.setIndex,
	questionIndex: state.control.questionIndex,
	shouldStartNextSet: state.control.shouldStartNextSet,
	finishedAllQuestions: state.control.finishedAllQuestions,
	displayIntro: state.control.displayIntro,
});

export default connect(mapStateToProps, {
	advanceControlQuestion,
	redoControlQuestion,
	advanceControlSet,
	startControlQuestions,
})(ConnectedControl);
