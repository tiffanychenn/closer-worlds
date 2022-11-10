import * as React from 'react';
import { LoggedFormElementComponent, LoggedFormElementProps } from './LoggedFormElement';

export interface Props extends LoggedFormElementProps {
	label?: string;
}

export default class RadioButton extends LoggedFormElementComponent<Props> {
	render() {
		const { label, id } = this.props;
		return <>
            <input type="radio" id={id} onInput={e => this.onInput(e)}></input>
            <label>{label}</label>
        </>;
	}
}
