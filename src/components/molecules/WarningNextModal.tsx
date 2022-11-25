import * as React from 'react';
import { Logger } from '../../data/logger';
import { FullscreenModal } from '../atoms/containers/FullscreenModal';
import { Button } from '../atoms/input/Button';
import { PageHeader, Text } from '../atoms/text/Text';

interface Props {
	show: boolean;
	warningTitle: string;
	body: string;
	onNext?: () => void;
	logger: Logger;
	buttonId: string;
}

export class WarningNextModal extends React.Component<Props> {
	render() {
		const { show, warningTitle, body, buttonId, logger, onNext } = this.props;

		const warningStyle: React.CSSProperties = {
			background: '#273B63', // '#8A4949',
			width: '100%',
			padding: '40px',
			boxSizing: 'border-box',
			display: 'flex',
			justifyContent: 'center',
		};

		const contentStyle: React.CSSProperties = {
			width: '100%',
			margin: '40px auto',
			maxWidth: '500px',
			textAlign: 'center',
			display: 'flex',
			gap: '40px',
			flexDirection: 'column',
			alignItems: 'center',
		};

		return <FullscreenModal show={show}>
			<div style={warningStyle}>
				<PageHeader>{warningTitle}</PageHeader>
			</div>
			<div style={contentStyle}>
				<Text>{body}</Text>
				<Button id={buttonId} logger={logger} text="Next" onClick={onNext}/>
			</div>
		</FullscreenModal>
	}
}
