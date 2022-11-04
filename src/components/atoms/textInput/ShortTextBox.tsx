import * as React from 'react';
import { Logger } from '../../../data/logger';

export interface Props {
	id: string;
	logger: Logger;
	placeholder?: string;
}

export default class ShortTextBox extends React.Component<Props> {
	private onInput(event: React.FormEvent<HTMLInputElement>) {
		let value = event.currentTarget.value;
		this.props.logger.log(this.props.id, value);
	}

	render() {
		const { placeholder } = this.props;
		return <input type="text" placeholder={placeholder} onInput={e => this.onInput(e)}></input>;
		// TODO: Make it purty, and also figure out sizing (flex? fixed? configurable from parent? etc.).
	}
}
