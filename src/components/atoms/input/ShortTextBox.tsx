import * as React from 'react';
import { LoggedFormElementComponent, LoggedFormElementProps } from './LoggedFormElement';

export interface Props extends LoggedFormElementProps {
	placeholder?: string;
	onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default class ShortTextBox extends LoggedFormElementComponent<Props> {
	render() {
		const { placeholder, onInput } = this.props;
		return <input type="text" placeholder={placeholder} onInput={e => {
			this.onInput(e);
			if (onInput) onInput(e);
		}}></input>;
		// TODO: Make it purty, and also figure out sizing (flex? fixed? configurable from parent? etc.).
	}
}
