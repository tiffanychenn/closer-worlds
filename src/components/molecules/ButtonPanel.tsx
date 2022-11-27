import * as React from 'react';
import { Logger } from '../../data/logger';
import { Panel } from '../atoms/containers/Panel';
import { Button } from '../atoms/input/Button';
import { TIMEOUT_WARNING_TEXT, TimerWarning, Warning } from '../atoms/text/Text';

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
	showTimeout: boolean;
}

export class ButtonPanel extends React.Component<Props> {
	static defaultProps = { showTimeout: false };

	render() {
		const { children, bgOpacity, flex, buttons, logger, showTimeout } = this.props;

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
			alignItems: 'end',
		};

		const warningStyle: React.CSSProperties = {
			opacity: showTimeout ? 1 : 0,
			transform: showTimeout ? 'scale(1)' : 'scale(0.5)',
			transition: 'all 0.3s ease-in-out',
			maxWidth: '400px',
		};

		return <Panel bgOpacity={bgOpacity} flex={flex} scroll={false}>
			<div style={containerStyle}>
				<div style={childStyle}>{children}</div>
				<div style={buttonsStyle}>{
					[
						...buttons.map(b => 
							<Button logger={logger} id={b.id}
								text={b.text} onClick={b.onClick}
								disabled={b.disabled}
								useOutlineStyle={b.useOutlineStyle}/>
						),
						<div style={warningStyle}><TimerWarning/></div>
					]}</div>
			</div>
		</Panel>;
	}
}
