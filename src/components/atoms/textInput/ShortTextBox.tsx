import * as React from 'react';
import { Logger } from '../../../data/logger';
import { LoggedFormElementComponent, LoggedFormElementProps } from './LoggedFormElement';

export interface Props extends LoggedFormElementProps {
	placeholder?: string;
}

export default class ShortTextBox extends LoggedFormElementComponent<Props> {
	render() {
		const { placeholder } = this.props;
		return <input type="text" placeholder={placeholder} onInput={e => this.onInput(e)}></input>;
		// TODO: Make it purty, and also figure out sizing (flex? fixed? configurable from parent? etc.).
	}
}
