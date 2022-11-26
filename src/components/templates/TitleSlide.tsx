import * as React from 'react';
import { Logger } from '../../data/logger';
import { TitleStep } from '../../data/story';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { Button } from '../atoms/input/Button';
import { BackgroundImage } from '../atoms/image/BackgroundImage';
import { ImageCard } from '../atoms/image/ImageCard';
import LongTextBox from '../atoms/input/LongTextBox';
import { DiscussionPrompt, Hint, Text, Error } from '../atoms/text/Text';
import { PlayerTokenHeader } from '../molecules/PlayerTokenHeader';
import { SlideBackground } from '../molecules/SlideBackground';
import { ContentWithImageSlide } from '../organisms/ContentWithImageSlide';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { BlankSlide } from '../organisms/BlankSlide';
import { v4 as uuidv4 } from 'uuid';
import { initExperimentData } from '../../actions/apiActions';
import { connect } from 'react-redux';
import { GAME_NAME, STAR_BG } from '../App/storyData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ShortTextBox from '../atoms/input/ShortTextBox';
import { RadioGroup } from '../atoms/input/RadioGroup';

interface Props {
	logger: Logger;
	step: TitleStep;
	onNext: (experimentId: string, firstPlayerId: string, secondPlayerId: string, experimentType: string) => void;
	error: string;
}

interface State {
	showDrawer: boolean;
	expId: string;
	p1Id: string;
	p2Id: string;
	hasOpenedDrawer: boolean;
	experimentType: string;
}

export class TitleSlide extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			showDrawer: false,
			expId: "",
			p1Id: "",
			p2Id: "",
			hasOpenedDrawer: false,
			experimentType: "Experimental",
		};
	}

	render() {
		const { logger, step, onNext, error } = this.props;
		const { showDrawer, hasOpenedDrawer, experimentType } = this.state;

		const headingStyle:  React.CSSProperties = {
			fontFamily: 'Sono',
			color: "white",
			margin: "auto",
			fontWeight: 400,
			fontSize: '120px',
			textAlign: 'center',
		}

		const style: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'column',
			gap: '120px',
			alignItems: 'center',
		};

		const drawerContainerStyle: React.CSSProperties = {
			position: 'absolute',
			bottom: '10px', left: 0, right: 0,
			display: 'flex',
			flexDirection: 'column',
			gap: '30px',
			alignItems: 'center',
			justifyContent: 'center',
		};

		const drawerStyle: React.CSSProperties = {
			display: 'flex',
			gap: '20px',
			alignItems: 'center',
		};

		step.backgroundImage = STAR_BG;
		
		return <BlankSlide step={step}
						   sectionImageUrls={[]}>
			<div style={style}>
				<h1 style={headingStyle}>{GAME_NAME}</h1>
				<Error>{error}</Error>
				<div style={{flex: 0}}><Button id="start-button" logger={logger} text="Start" onClick={() => {
					const { expId, p1Id, p2Id, experimentType } = this.state;
					const experimentId = expId == "" ? uuidv4() : expId;
					const firstPlayerId = p1Id == "" ? uuidv4() : p1Id;
					const secondPlayerId = p2Id == "" ? uuidv4() : p2Id;
					onNext(experimentId, firstPlayerId, secondPlayerId, experimentType);
				}}></Button></div>
			</div>
			<div style={drawerContainerStyle}>{
				hasOpenedDrawer && !showDrawer ? <></> : 
				showDrawer
				? <>
					<FontAwesomeIcon icon={faChevronDown} size="2x" color="rgba(255,255,255,0.3)" onClick={() => this.setState({showDrawer: false})}/>
					<div style={drawerStyle}>
						<ShortTextBox id="admin-experiment-id" logger={logger} placeholder="Experiment ID" onInput={e => this.setState({expId: e.currentTarget.value})}/>
						<ShortTextBox id="admin-p1-id" logger={logger} placeholder="Participant 1 ID" onInput={e => this.setState({p1Id: e.currentTarget.value})}/>
						<ShortTextBox id="admin-p2-id" logger={logger} placeholder="Participant 2 ID" onInput={e => this.setState({p2Id: e.currentTarget.value})}/>
						<RadioGroup id="game-type-radio-group-id"
									ids={["radio-button-experimental", "radio-button-control"]}
									labels={["Experimental", "Control"]}
									orientation="horizontal"
									logger={logger}
									onSelect={(value) => {this.setState({experimentType: value});}}
									selected={experimentType}/>
					</div>
				</>
				: <FontAwesomeIcon icon={faChevronUp} size="2x" color="rgba(255,255,255,0.3)" onClick={() => this.setState({showDrawer: true, hasOpenedDrawer: true})}/>
			}</div>
		</BlankSlide>
	}
}