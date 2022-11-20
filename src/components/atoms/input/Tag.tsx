import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as React from "react";
import { Logger } from "../../../data/logger";
import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";
import ShortTextBox from "./ShortTextBox";
import { css } from '@emotion/react';

export interface Props extends LoggedFormElementProps {
	text: string;
	onClick?: (isSelected: boolean) => void;
    disabled?: boolean;
    isInput?: boolean;
	useOutlineStyle: boolean;
	onAddTag?: (value: string) => void;
	startAsSelected?: boolean;
}

interface State {
	selected: boolean;
	hovered: boolean;
	inputValue: string;
}

export class Tag extends LoggedFormElementComponent<Props, State> {
	static defaultProps = { useOutlineStyle: false };

	constructor(props: Props) {
		super(props);
		const selected = props.startAsSelected || false;
		this.state = { selected: selected, hovered: false, inputValue: "" };
	}
	
	render() {
		const { disabled, useOutlineStyle, isInput } = this.props;
		const { selected, hovered } = this.state;

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

		const bgColor = disabled ? '#2C3978' : (selected ? '#ffffff' : (hovered ? '#10206C' : '#0A1547'));

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

		return <button style={style} type="button" disabled={this.props.disabled}
					   onMouseEnter={() => this.setState({hovered: true})}
					   onMouseLeave={() => this.setState({hovered: false})}
		 			   onClick={() => {
			this.onAnyEvent('!click');
			if (this.props.onClick) {
				this.props.onClick(!this.state.selected);
			}
			if (!isInput) this.setState({selected: !this.state.selected})
		}}>
			{isInput ? <input style={inputStyle} type="text" placeholder={this.props.text ? this.props.text.toLowerCase(): undefined} onInput={e => {
				this.onInput(e);
				this.setState({inputValue: e.currentTarget.value});
			}}></input> : this.props.text.toLowerCase()}
			<div style={{width: '10px', display: 'inline-block'}}></div>
			<FontAwesomeIcon icon={selected ? faMinus : faPlus} onClick={() => {
				if (isInput && this.state.inputValue.length > 0 && this.props.onAddTag) {
					this.props.onAddTag(this.state.inputValue);
				}
			}}/>
		</button>
	}
}

interface InputProps extends LoggedFormElementProps {
	placeholder?: string;
	onAddTag?: (value: string) => void;
}

interface InputState {
	value: string;
}

export class TagInput extends LoggedFormElementComponent<InputProps, InputState> {
	constructor(props: InputProps) {
		super(props);
		this.state = { value: "" };
	}

	render() {
		const { placeholder, onAddTag } = this.props;
		const { value } = this.state;

		const style = css({
			fontSize: '18px',
			borderRadius: '44px',
			minWidth: '60px',
			padding: '0 20px',
			height: '50px',
			stroke: 'none',
			display: 'block',
			transition: 'all 0.2s',
			border: '2px solid white',
			background: 'transparent',
			color: 'white',
			opacity: 0.5,
			':hover': {
				opacity: 1,
			},
		});

		const inputStyle = css({
			background: 'transparent',
			border: 'none',
			stroke: 'none',
			outline: 'none',
			fontFamily: 'PT Sans',
			fontSize: '18px',
			color: 'white',
			transition: 'all 0.2s',
			width: '150px',
			'::placeholder': {
				color: 'rgba(255, 255, 255, 0.5)',
			},
		});

		const plusStyle = css({
			display: 'inline-block',
			transform: 'scale(1)',
			transition: 'all 0.2s',
			':hover': {
				transform: 'scale(1.25)',
			},
		});

		return <button css={style} type="button">
			<input css={inputStyle} placeholder={placeholder ? placeholder.toLowerCase() : undefined} onInput={e => {
				this.setState({value: e.currentTarget.value});
				this.onInput(e);
			}}/>
			<div style={{width: '10px', display: 'inline-block'}}></div>
			<div css={plusStyle}>
				<FontAwesomeIcon icon={faPlus} onClick={() => {
					if (value.length > 0 && onAddTag) {
						onAddTag(value);
					}
				}}/>
			</div>
		</button>;
	}
}
