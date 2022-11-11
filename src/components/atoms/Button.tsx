import * as React from "react";

export interface Props {
	text?: string;
    disabled?: boolean;
}

export class Button extends React.Component<Props> {
	render() {
		return <button type="button" disabled={this.props.disabled}>{this.props.text}</button>
	}
}
