import * as React from 'react';
import { css } from '@emotion/react';
import { LoggedFormElementComponent, LoggedFormElementProps } from './LoggedFormElement';

export interface Props extends LoggedFormElementProps {
	label?: string;
	name?: string;
	onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default class RadioButton extends LoggedFormElementComponent<Props> {
	render() {
		const { label, id, name, onInput } = this.props;

		const style = css({
			appearance: 'none',
			width: '24px',
			height: '24px',
			border: '1px solid white',
			borderRadius: '50%',
			display: 'grid',
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
		});

		const containerStyle = css({
			display: 'flex',
			gap: '10px',
			flexDirection: 'row',
			alignItems: 'center',
		});

		return <div css={containerStyle}>
            <input type="radio" id={id} name={name} css={style} onInput={e => {
				this.onInput(e);
				if (onInput) onInput(e);
			}}></input>
            <label css={labelStyle}>{label}</label>
        </div>;
	}
}

// FIXME: Not super important, but the logging might get weird when multiple radio
// buttons come together into one form element. We care about which radio button
// is selected, not whether a radio button is selected (roughly the same thing, but
// might get weird). Not a major priority, though.
