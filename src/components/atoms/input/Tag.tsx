import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as React from "react";
import { Logger } from "../../../data/logger";
import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";
import ShortTextBox from "./ShortTextBox";

export interface Props extends LoggedFormElementProps {
	text?: string;
	onClick?: () => void;
    disabled?: boolean;
    isInput?: boolean;
	useOutlineStyle: boolean;
}

interface State {
	selected: boolean;
}

export class Tag extends LoggedFormElementComponent<Props, State> {
	static defaultProps = { useOutlineStyle: false };

	constructor(props: Props) {
		super(props);
		this.state = { selected: false };
	}
	
	render() {
		const { disabled, useOutlineStyle, isInput } = this.props;
		const { selected } = this.state;

		const style: React.CSSProperties = {
			fontSize: '18px',
			borderRadius: '44px',
			minWidth: '60px',
			padding: '0 20px',
			height: '50px',
			stroke: 'none',
			display: 'block',
			transition: 'all 0.2s',
		};

		const inputStyle: React.CSSProperties = {
			background: '#0A1547',
			color: 'white',
			border: 'none',
			fontFamily: 'PT Sans',
			stroke: 'none',
			outline: 'none',
			resize: 'none',
			boxSizing: 'border-box',
			transition: 'all 0.2s',
		};

		const bgColor = disabled ? '#2C3978' : (selected ? '#ffffff' : '#0A1547');

		if (useOutlineStyle) {
			style.border = '2px solid ' + bgColor;
			style.background = 'transparent';
			style.color = bgColor;
		} else {
			style.border = 'none',
			style.background = bgColor;
            style.color = selected ? '#1A1A1A' : "#ffffff";
            inputStyle.color = selected ? '#1A1A1A' : "#ffffff";
            inputStyle.background = bgColor;
		}

		return <button style={style} type="button" disabled={this.props.disabled} onClick={() => {
			this.onAnyEvent('!click');
			if (this.props.onClick) {
				this.props.onClick();
			}
            this.setState({selected: !this.state.selected})
		}}>{isInput ? <input style={inputStyle} type="text" onInput={e => {
			this.onInput(e);
		}}></input> : this.props.text} <FontAwesomeIcon icon={faPlus}  /></button>
	}
}
