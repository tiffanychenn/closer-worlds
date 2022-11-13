import * as React from 'react';
import { PageHeader } from '../atoms/text/Text';

interface Props {
	children: React.ReactNode;
	player: 1 | 2 | 'both'; // TODO: Use this
}

export class PlayerTokenHeader extends React.Component<Props> {
	render() {
		return <div>
			<span style={{width: 50, height: 50, borderRadius: '50%', background: 'blue'}}></span> {/* TODO: Placeholder for player token */}
			<PageHeader>{this.props.children}</PageHeader>
		</div>
	}
}
