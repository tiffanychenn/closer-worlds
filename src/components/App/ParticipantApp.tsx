import * as React from "react";
import { Logger } from "../../data/logger";
import ConnectedStorySlide from "../pages/ConnectedStorySlide";

export const DEBUG_MODE = false;

export default class ParticipantApp extends React.Component<{}> {
	private logger: Logger;

	constructor() {
		super({});
		this.logger = new Logger((entries, timesPerId) => {
			console.log(entries, timesPerId);
		}); // TODO: Write a storeData function that's probably just calling a thunk to send the data to a server, or saving to a cookie.
	}

	render() {
		return <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
			<ConnectedStorySlide logger={this.logger}/>
		</div>;
	}
}
