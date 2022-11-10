import * as React from 'react';
import { LoggedFormElementComponent, LoggedFormElementProps } from './LoggedFormElement';

export interface Props extends LoggedFormElementProps {
	placeholder?: string;
}

export default class LongTextBox extends LoggedFormElementComponent<Props> {
	render() {
		const { placeholder } = this.props;
		return <textarea placeholder={placeholder} onInput={e => this.onTextArea(e)}></textarea>;
	}
}
