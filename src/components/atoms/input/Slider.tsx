import * as React from "react";
import { css, CSSObject } from "@emotion/react";
import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";

export interface Props extends LoggedFormElementProps {
	leftLabel: string;
	rightLabel: string;
}

interface State {
	value: number;
}

export class Slider extends LoggedFormElementComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { value: 50 };
	}

	render() {
		const { leftLabel, rightLabel } = this.props;
		const { value } = this.state;

		const thumb: CSSObject = {
			appearance: 'none',
			height: '24px',
			width: '24px',
			background: '#0084FD',
			borderRadius: '50%',
			boxShadow: '0 0 10px 0 rgba(170, 189, 255, 0.5)',
			transform: 'scale(0.9)',
			transition: '0.2s all',
			':hover': {
				boxShadow: '0 0 20px 0 rgba(170, 189, 255, 0.5)',
				transform: 'scale(1)',
			},
		};

		const track: CSSObject = {
			appearance: 'none',
			boxShadow: 'none',
			border: 'none',
			background: 'transparent',
		};

		const sliderStyle = css({
			width: '100%',
			'::-webkit-slider-thumb': thumb,
			'::-moz-range-thumb': thumb,
			'::-ms-thumb': thumb,
			'::-webkit-slider-runnable-track': track,
			'::-moz-range-track': track,
			'::-ms-track': track,
			appearance: 'none',
			height: '4px',
			background: 'rgba(255, 255, 255, 0.3)',
			borderRadius: '999999px',
			margin: 0,
			padding: 0,
			backdropFilter: 'blur(20px)',
			marginBottom: '12px',
			backgroundImage: 'linear-gradient(to right, rgba(0, 132, 253, 0.7), rgba(0, 132, 253, 1))',
			backgroundSize: `${value}% 100%`,
			backgroundRepeat: 'no-repeat',
		});

		const labelsStyle = css({
			width: '100%',
			color: 'white',
			display: 'flex',
			justifyContent: 'space-between',
			fontFamily: 'PT Sans',
			fontSize: '24px',
			fontWeight: 700, // bold
			margin: 0,
		});

		return <div>
			<input css={sliderStyle} type="range" min="1" max="100" onInput={e => {
				this.onInput(e);
				this.setState({
					value: parseInt(e.currentTarget.value),
				});
			}}></input>
			<div css={labelsStyle}>
				<span>{leftLabel}</span>
				<span>{rightLabel}</span>
			</div>
		</div>
	}
}
