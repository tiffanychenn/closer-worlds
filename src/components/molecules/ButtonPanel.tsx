import * as React from 'react';
import { Logger } from '../../data/logger';
import { Panel } from '../atoms/containers/Panel';
import { Button } from '../atoms/input/Button';

export interface ButtonData {
	id: string;
	text: string;
	onClick?: () => void;
	disabled?: boolean;
	useOutlineStyle?: boolean;
};

interface Props {
	children: React.ReactNode;
	bgOpacity?: number;
	flex?: string;
	buttons: Array<ButtonData>;
	logger: Logger;
}

export class ButtonPanel extends React.Component<Props> {
	render() {
		const { children, bgOpacity, flex, buttons, logger } = this.props;

		const containerStyle: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			gap: '20px',

			position: 'absolute',
			top: 0, left: 0, bottom: 0, right: 0,
		};

		const childStyle: React.CSSProperties = {
			flex: 1,
			width: '100%',
			overflow: 'scroll',
		};

		const buttonsStyle: React.CSSProperties = {
			flex: 'none',
			display: 'flex',
			gap: '20px',
		};

		return <Panel bgOpacity={bgOpacity} flex={flex} scroll={false}>
			<div style={containerStyle}>
				<div style={childStyle}>{children}</div>
				<div style={buttonsStyle}>{...buttons.map(b => 
					<Button logger={logger} id={b.id}
							text={b.text} onClick={b.onClick}
							disabled={b.disabled}
							useOutlineStyle={b.useOutlineStyle}/>
				)}</div>
			</div>
		</Panel>;
	}
}
