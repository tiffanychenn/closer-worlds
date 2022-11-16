import * as React from "react";
import { Logger } from "../../../data/logger";
import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";

export interface Props extends LoggedFormElementProps {
	text?: string;
	onClick?: () => void;
    disabled?: boolean;
}

interface State {
	hovered: boolean;
}

export class Button extends LoggedFormElementComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hovered: false };
	}
	
	render() {
		const { disabled } = this.props;
		const { hovered } = this.state;

		const style: React.CSSProperties = {
			background: disabled ? '#2C3978' : (hovered ? '#006FD6' : '#0084FD'),
			color: disabled ? '#848DB5' : 'white',
			fontFamily: 'Sono',
			fontWeight: 700, // bold
			fontSize: '18px',
			borderRadius: '12px',
			width: '100px',
			height: '50px',
			border: 'none',
			stroke: 'none',
			display: 'block',
		};

		return <button style={style} type="button" disabled={this.props.disabled} onClick={() => {
			this.onAnyEvent('click');
			if (this.props.onClick) {
				this.props.onClick();
			}
		}} onMouseEnter={() => this.setState({hovered: true})}
		onMouseLeave={() => this.setState({hovered: false})}>{this.props.text.toUpperCase()}</button>
	}
}
