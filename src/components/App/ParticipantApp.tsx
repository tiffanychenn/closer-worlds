import * as React from "react";
import { Logger } from "../../data/logger";
import { store } from "../../store/store";
import LongTextBox from "../atoms/textInput/LongTextBox";
import RadioButton from "../atoms/textInput/RadioButton";
import ShortTextBox from "../atoms/textInput/ShortTextBox";
import { Slider } from "../atoms/textInput/Slider";

export default class ParticipantApp extends React.Component<{}> {
	private logger: Logger;

	constructor() {
		super({});
		this.logger = new Logger((entries, timesPerId) => {
			console.log(entries, timesPerId);
		}); // TODO: Write a storeData function that's probably just calling a thunk to send the data to a server, or saving to a cookie.
	}

	render() {
		return <>
			<ShortTextBox id="test-text-box" logger={this.logger} placeholder="Testing..."/>
			<Slider id="test-slider" logger={this.logger} leftLabel="low" rightLabel="high"/>
			<LongTextBox id="test-long-text" logger={this.logger} placeholder="Testing..."/>
			<RadioButton id="test-radio-button" logger={this.logger} label="Test"/>
		</>;
	}
}
