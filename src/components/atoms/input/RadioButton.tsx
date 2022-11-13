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

// FIXME: Not super important, but the logging might get weird when multiple radio
// buttons come together into one form element. We care about which radio button
// is selected, not whether a radio button is selected (roughly the same thing, but
// might get weird). Not a major priority, though.
