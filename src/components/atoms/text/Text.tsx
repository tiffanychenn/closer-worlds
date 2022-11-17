import * as React from "react";

interface Props {
	children: React.ReactNode;
}

// TODO: Styles, of course.

// Main body text.
export class Text extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			color: '#F1F1F1',
			fontSize: '22px',
			fontFamily: 'PT Sans',
			fontWeight: 400, // regular
			margin: 0,
		};

		return <p style={style}>{this.props.children}</p>;
	}
}

// Tooltip-style thing that we've been talking about.
export class Hint extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			color: '#C5C5C5',
			fontStyle: 'italic',
			fontSize: '18px',
			fontFamily: 'PT Sans',
			fontWeight: '400', // regular
			margin: 0,
		};
		const titleStyle: React.CSSProperties = {
			color: 'white',
			fontWeight: '700', // bold
		};
		return <p style={style}><span style={titleStyle}>Hint</span> {this.props.children}</p>;
	}
}

export class Warning extends React.Component<Props> {
	render () {
		const style: React.CSSProperties = {
			color: '#CA3E12',
			fontStyle: 'italic',
			fontSize: '18px',
			fontFamily: 'PT Sans',
			fontWeight: '400', // regular
			margin: 0,
		};
		return <p style={style}>{this.props.children}</p>
	}
}

// Background highlight. Tells user what to do.
export class DiscussionPrompt extends React.Component<Props> {
	render() {
		const textStyle: React.CSSProperties = {
			fontFamily: 'PT Sans',
			fontSize: '28px',
			color: 'white',
			fontWeight: 400, // regular
			margin: 0,
		};

		const containerStyle: React.CSSProperties = {
			width: '100%',
			position: 'relative',
			background: 'url(./assets/discussion_prompt_bg.png)',
			backgroundSize: 'cover',
			borderRadius: '28px',
			boxSizing: 'border-box',
			padding: '40px',
		};

		const contentStyle: React.CSSProperties = {
			// margin: '40px',
		};

		return <div style={containerStyle}>
			<div style={contentStyle}>
				<PageHeader>Discuss</PageHeader>
				<div style={{height: '20px'}}></div>
				<p style={textStyle}>{this.props.children}</p>
			</div>
		</div>;
	}
}

// Sans-serif header for the top of each page.
export class PageHeader extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			fontSize: '24px',
			fontFamily: 'Sono',
			fontWeight: 600, // semibold
			color: 'white',
			margin: 0,
		};

		return <h1 style={style}>{this.props.children}</h1>
	}
}

// For the home page and quite possibly for reflection questions.
export class SerifHeader extends React.Component<Props> {
	render() {
		return <h1>{this.props.children}</h1>
	}
}

export class TextSpacer extends React.Component {
	render () {
		return <div style={{height: '30px'}}></div>;
	}
}
