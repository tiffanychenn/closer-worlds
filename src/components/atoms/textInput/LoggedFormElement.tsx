import * as React from "react";
import { Logger } from "../../../data/logger";

export interface LoggedFormElementProps {
	id: string; // The unique id within all forms across the application to represent the data this form element generates.
	logger: Logger;
}

export abstract class LoggedFormElementComponent<T extends LoggedFormElementProps> extends React.Component<T> {
	protected onInput(event: React.FormEvent<HTMLInputElement>) {
		let value = event.currentTarget.value;
		this.props.logger.log(this.props.id, value);
	}
}
