import * as React from "react";

export interface Props {
	text?: string;
}

export class Button extends React.Component<Props> {
	render() {
		return <button type="button">{this.props.text}</button>
	}
}
