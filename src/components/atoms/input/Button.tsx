import * as React from "react";
import { Logger } from "../../../data/logger";
import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";

export interface Props extends LoggedFormElementProps {
	text?: string;
	onClick?: () => void;
    disabled?: boolean;
}

export class Button extends LoggedFormElementComponent<Props> {
	render() {
		return <button type="button" disabled={this.props.disabled} onClick={() => {
			this.onAnyEvent('click');
			if (this.props.onClick) {
				this.props.onClick();
			}
		}}>{this.props.text}</button>
	}
}
