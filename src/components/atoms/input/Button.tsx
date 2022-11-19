import * as React from "react";
import { Logger } from "../../../data/logger";
import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";

export interface Props extends LoggedFormElementProps {
	text?: string;
	onClick?: () => void;
    disabled?: boolean;
	useOutlineStyle: boolean;
}

interface State {
	hovered: boolean;
}

export class Button extends LoggedFormElementComponent<Props, State> {
	static defaultProps = { useOutlineStyle: false };

	constructor(props: Props) {
		super(props);
		this.state = { hovered: false };
	}
	
	render() {
		const { disabled, useOutlineStyle } = this.props;
		const { hovered } = this.state;

		const style: React.CSSProperties = {
			fontFamily: 'Sono',
			fontWeight: 700, // bold
			fontSize: '18px',
			borderRadius: '12px',
			minWidth: '60px',
			padding: '0 20px',
			height: '50px',
			stroke: 'none',
			display: 'block',
			transition: 'all 0.2s',
		};

		const bgColor = disabled ? '#2C3978' : (hovered ? '#0057BD' : '#0084FD');
		const textColor = disabled ? '#848DB5' : 'white';

		if (useOutlineStyle) {
			style.border = '2px solid ' + bgColor;
			style.background = 'transparent';
			style.color = textColor;
		} else {
			style.border = 'none',
			style.background = bgColor;
			style.color = textColor;
		}

		return <button style={style} type="button" disabled={this.props.disabled} onClick={() => {
			this.onAnyEvent('!click');
			if (this.props.onClick) {
				this.props.onClick();
			}
		}} onMouseEnter={() => this.setState({hovered: true})}
		onMouseLeave={() => this.setState({hovered: false})}>{this.props.text.toUpperCase()}</button>
	}
}
