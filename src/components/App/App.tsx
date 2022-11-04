import * as React from "react";
import { Logger } from "../../data/logger";
import { store } from "../../store/store";
import ShortTextBox from "../atoms/textInput/ShortTextBox";

export default class App extends React.Component<{}> {
	private logger: Logger;

	constructor() {
		super({});
		this.logger = new Logger((entries, timesPerId) => {
			console.log(entries, timesPerId);
		}); // TODO: Write a storeData function that's probably just calling a thunk to send the data to a server, or saving to a cookie.
	}

	render() {
		return <ShortTextBox id="test-text-box" logger={this.logger} placeholder="Testing..."/>;
	}
}
