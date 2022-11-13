import * as React from "react";

interface Props {
	children: React.ReactNode;
}

// TODO: Styles, of course.

// Main body text.
export class Text extends React.Component<Props> {
	render() {
		return <p>{this.props.children}</p>;
	}
}

// Tooltip-style thing that we've been talking about.
export class Hint extends React.Component<Props> {
	// TODO: This should always have something preceding it (a loading animation, an exclamation mark, or a timer icon).
	render() {
		return <p>{this.props.children}</p>;
	}
}

// Background highlight. Tells user what to do.
export class ActionItem extends React.Component<Props> {
	render() {
		return <p>{this.props.children}</p>;
	}
}

// Sans-serif header for the top of each page.
export class PageHeader extends React.Component<Props> {
	render() {
		return <h1>{this.props.children}</h1>
	}
}

// For the home page and quite possibly for reflection questions.
export class SerifHeader extends React.Component<Props> {
	render() {
		return <h1>{this.props.children}</h1>
	}
}
