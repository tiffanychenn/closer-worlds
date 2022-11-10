import * as React from "react";
import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";

export interface Props extends LoggedFormElementProps {
	leftLabel: string;
	rightLabel: string;
}

export class Slider extends LoggedFormElementComponent<Props> {
	render() {
		const { leftLabel, rightLabel } = this.props;
		return <div><span>{leftLabel}</span><input type="range" min="1" max="100" onInput={e => this.onInput(e)}></input><span>{rightLabel}</span></div>
	}
}
