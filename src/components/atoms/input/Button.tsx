import * as React from "react";
import { Logger } from "../../../data/logger";
import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";

export interface Props extends LoggedFormElementProps {
	text?: string;
	onClick?: () => void;
}

export class Button extends LoggedFormElementComponent<Props> {
	render() {
		return <button type="button" onClick={() => {
			this.onAnyEvent('click');
			if (this.props.onClick) {
				this.props.onClick();
			}
		}}>{this.props.text}</button>
	}
}
