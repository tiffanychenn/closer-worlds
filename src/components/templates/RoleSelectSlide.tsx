import * as React from 'react';
import { Logger } from '../../data/logger';
import { CustomFormStep, RoleSelectStep, StoryStepType } from '../../data/story';
import { STAR_BG } from '../App/storyData';
import { GAP_BETWEEN_QUESTIONS, QuestionGroup } from '../atoms/containers/QuestionGroup';
import { RadioGroup } from '../atoms/input/RadioGroup';
import { PageHeader, Text } from '../atoms/text/Text';
import { CustomFormSlide } from './CustomFormSlide';

interface Props {
	logger: Logger;
	step: RoleSelectStep;
	onNext?: (landscapePlayer: 1 | 2) => void;
	onBack?: () => void;
	error: string;
}

interface State {
	landscapePlayer: 1 | 2 | undefined;
}

const ROLE_SELECT_QUESTION_ID = "role-select-landscape";
const ROLE_SELECT_VALUE_P1 = "Player 1";
const ROLE_SELECT_VALUE_P2 = "Player 2";

export class RoleSelectSlide extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { landscapePlayer: 1 };
	}

	render() {
		const { logger, step, onNext, onBack, error } = this.props;
		const { landscapePlayer } = this.state;

		const fakeStep: CustomFormStep = {
			type: StoryStepType.CustomForm,
			id: 'role-select',
			backgroundImage: STAR_BG,
			player: 'both',
			playerAction: 'Discuss the following',
			requiredFormElemIds: ["world-tags", ROLE_SELECT_QUESTION_ID],
			maxWidthIfNoImageCard: false,
			itemSpacing: GAP_BETWEEN_QUESTIONS,
			timeLimitMs: step.timeLimitMs,
			makeContent: (logger, hasTimedOut, renderText) => {
				return <>
					<QuestionGroup>
						<Text>To decide who should build what, discuss as a pair.</Text>
					</QuestionGroup>
					<QuestionGroup>
						<PageHeader>Between the two of you... who is closest to nature?</PageHeader>
						<RadioGroup id={ROLE_SELECT_QUESTION_ID}
									logger={logger}
									ids={["role-select-landscape-p1", "role-select-landscape-p2"]}
									labels={[ROLE_SELECT_VALUE_P1, ROLE_SELECT_VALUE_P2]}
									orientation="horizontal"
									onSelect={value => this.setState({ landscapePlayer: value == ROLE_SELECT_VALUE_P1 ? 1 : 2 })}
									selected={this.state.landscapePlayer === 1 ? ROLE_SELECT_VALUE_P1 : (this.state.landscapePlayer === 2 ? ROLE_SELECT_VALUE_P2 : undefined)}/>
						<PageHeader>and who most enjoys to build?</PageHeader>
						<RadioGroup id="role-select-nature"
									logger={logger}
									ids={["role-select-landscape-p1", "role-select-landscape-p2"]}
									labels={["Player 1", "Player 2"]}
									orientation="horizontal"
									onSelect={value => this.setState({ landscapePlayer: value == ROLE_SELECT_VALUE_P1 ? 2 : 1 })}
									selected={this.state.landscapePlayer === 1 ? ROLE_SELECT_VALUE_P2 : (this.state.landscapePlayer === 2 ? ROLE_SELECT_VALUE_P1 : undefined) }/>
					</QuestionGroup>
					<QuestionGroup>
						<Text>Based on this, you decide that player {landscapePlayer} will start with the landscape, and player {3 - landscapePlayer} will start with the buildings.</Text>
					</QuestionGroup>
				</>;
			},
		};

		return <CustomFormSlide step={fakeStep}
								logger={logger}
								onNext={() => onNext(landscapePlayer)}
								onBack={() => onBack()}
								// Neither landscapePlayer nor sectionImageUrls will be used
								// here, so it's ok to use dummy values.
								landscapePlayer={1}
								sectionImageUrls={[]}
								error={error}/>
	}
}
