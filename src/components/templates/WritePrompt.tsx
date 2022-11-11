import * as React from 'react';
import { WritePromptStep } from '../../data/story';
import { playerRoleToNumber, renderBoldText, replacePlayerText } from '../../utils/textUtils';
import { ActionItem, Text } from '../atoms/text/Text';
import { PlayerTokenHeader } from '../molecules/PlayerTokenHeader';

interface Props {
	step: WritePromptStep;
	landscapePlayer: 1 | 2;
}

export class WritePrompt extends React.Component<Props> {
	render() {
		const { step, landscapePlayer } = this.props;
		const playerNumber = playerRoleToNumber(step.player, landscapePlayer);

		const pageStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0, left: 0,
			width: '100%',
			height: '100%',
		};
		const contentStyle: React.CSSProperties = {};
		const imageStyle: React.CSSProperties = {};

		return <div style={pageStyle}>
			<div style={contentStyle}>
				<PlayerTokenHeader player={playerNumber}>{replacePlayerText(step.title, playerNumber)}</PlayerTokenHeader>
				<ActionItem>Read the following out loud.</ActionItem>
				<Text>{renderBoldText(replacePlayerText(step.instructions, playerNumber))}</Text>
			</div>
			<div style={imageStyle}>

			</div>
		</div>;
	}
}
