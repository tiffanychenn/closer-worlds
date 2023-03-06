import * as React from "react";
import { connect } from "react-redux";
import { Logger } from "../../data/logger";
import { State } from "../../reducers/rootReducer";
import ConnectedControl from "../pages/ConnectedControl";
import ConnectedStorySlide from "../pages/ConnectedStorySlide";

export const DEBUG_MODE = false;

interface ReduxStateProps {
	experimentType: string;
}

type Props = ReduxStateProps;

class ParticipantApp extends React.Component<Props> {
	private logger: Logger;

	constructor(props: Props) {
		super(props);
		this.logger = new Logger((entries, timesPerId) => {
			console.log(entries, timesPerId);
		});
	}

	render() {
		const { experimentType } = this.props;
		return <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
			{ experimentType == 'Experimental'
				? <ConnectedStorySlide logger={this.logger}/>
				: <ConnectedControl logger={this.logger}/>
			}
		</div>;
	}
}

const mapStateToProps = (state: State): ReduxStateProps => ({
	experimentType: state.prompt.experimentType,
});

export default connect(mapStateToProps)(ParticipantApp);
