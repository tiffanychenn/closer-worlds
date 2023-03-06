import * as React from 'react';
import { css } from '@emotion/react';
import { LoggedFormElementComponent, LoggedFormElementProps } from './LoggedFormElement';

export interface Props extends LoggedFormElementProps {
	label?: string;
	name?: string;
	onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
	selected?: boolean;
}

export default class RadioButton extends LoggedFormElementComponent<Props> {
	render() {
		const { label, id, name, onInput, selected } = this.props;

		const style = css({
			appearance: 'none',
			width: '24px',
			height: '24px',
			border: '1px solid white',
			borderRadius: '50%',
			display: 'inline-grid',
			placeContent: 'center',
			':before': {
				content: '""',
				width: '16.8px',
				height: '16.8px',
				background: 'white',
				borderRadius: '50%',
				transform: 'scale(0)',
				transition: '0.2s transform',
			},
			':checked': {
				':before': {
					transform: 'scale(1)',
				},
			},
		});

		const labelStyle = css({
			color: 'white',
			fontSize: '16px',
			fontFamily: 'PT Sans',
			fontWeight: '700', // bold
			margin: 0,
			display: 'flex',
			alignItems: 'center',
			gap: '10px',
		});

		return <label css={labelStyle}>
			<input type="radio" checked={selected} id={id} name={name} css={style} onChange={e => {
				this.onInput(e);
				if (onInput) onInput(e);
			}}></input>
			<span>{label}</span>
		</label>;
	}
}
