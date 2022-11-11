import * as React from "react";

export interface Props {
	text?: string;
	onClick?: () => void;
}

export class Button extends React.Component<Props> {
	render() {
		return <button type="button" onClick={this.props.onClick}>{this.props.text}</button>
	}
}
