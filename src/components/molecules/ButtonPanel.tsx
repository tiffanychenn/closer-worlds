import * as React from 'react';
import { css } from '@emotion/react';
import { Logger } from '../../data/logger';
import { Panel } from '../atoms/containers/Panel';
import { Button } from '../atoms/input/Button';
import { TimerWarning } from '../atoms/text/Text';
import { CSSInterpolation } from '@emotion/serialize';

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

const scrollBorder = 20;
const scrollWidth = 4;
export const OVERFLOW_SCROLL_STYLE: CSSInterpolation = {
	overflowY: 'auto',
	overflowX: 'hidden',
	'::-webkit-scrollbar': {
		width: `${scrollBorder + scrollWidth}px`,
		backgroundColor: 'rgba(0,0,0,0)',
	},
	'::-webkit-scrollbar-track': {
		borderLeft: `${scrollBorder}px solid rgba(255,255,255,0)`,
		backgroundClip: 'padding-box',
		backgroundColor: 'rgba(255,255,255,0.15)',
	},
	'::-webkit-scrollbar-thumb': {
		borderLeft: `${scrollBorder}px solid rgba(255,255,255,0)`,
		backgroundClip: 'padding-box',
		backgroundColor: 'rgba(255,255,255,0.5)',
		transition: 'background-color 0.2s',
		':hover': {
			backgroundColor: 'rgba(255,255,255,0.7)',
		},
	},
};

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

		const childStyle = css(
			{
				flex: 1,
				width: '100%',
			},
			OVERFLOW_SCROLL_STYLE,
		);

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
				<div css={childStyle}>{children}</div>
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
