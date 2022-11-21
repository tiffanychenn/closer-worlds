import * as React from 'react';

interface Props {
	children: React.ReactNode;
	gap: string;
}

export const GAP_BETWEEN_QUESTIONS = '60px';
export const GAP_WITHIN_QUESTIONS = '30px';

export class QuestionGroup extends React.Component<Props> {
	static defaultProps = { gap: '30px', };

	render() {
		const { children, gap } = this.props;

		const style: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'column',
			gap,
		};

		return <div style={style}>{children}</div>;
	}
}
