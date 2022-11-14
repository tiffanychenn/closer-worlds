import * as React from 'react';
import { LoggedFormElementComponent, LoggedFormElementProps } from './LoggedFormElement';

export interface Props extends LoggedFormElementProps {
	placeholder?: string;
	onInput?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

export default class LongTextBox extends LoggedFormElementComponent<Props> {
	render() {
		const { placeholder, onInput } = this.props;
		return <textarea placeholder={placeholder} onInput={e => {
			this.onTextArea(e);
			if (onInput) onInput(e);
		}}></textarea>;
	}
}
