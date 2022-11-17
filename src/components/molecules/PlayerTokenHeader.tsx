import * as React from 'react';
import { PageHeader } from '../atoms/text/Text';

interface Props {
	children: React.ReactNode;
	player: 1 | 2 | 'both'; // TODO: Use this
}

export class PlayerTokenHeader extends React.Component<Props> {
	render() {
		const { children, player } = this.props;

		let playerName;
		let bg;
		switch (player) {
			case 1:
				playerName = 'Player 1';
				bg = './assets/player1_bg.png';
				break;
			case 2:
				playerName = 'Player 2';
				bg = './assets/player2_bg.png';
				break;
			case 'both':
				playerName = 'Both players';
				bg = './assets/both_players_bg.png';
				break;
		}

		const textStyle: React.CSSProperties = {
			margin: 0,
			fontFamily: 'Sono',
			fontSize: '18px',
			color: 'white',
			fontWeight: 400, // regular
		};

		const containerStyle: React.CSSProperties = {
			width: '400px',
			padding: '20px 40px',
			boxSizing: 'border-box',
			background: `url(${bg})`,
			backgroundSize: 'cover',
			backdropFilter: 'blur(14px)',
			borderRadius: '16px',
			boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25)',
		};

		return <div style={containerStyle}>
			<PageHeader>{playerName}</PageHeader>
			<p style={textStyle}>{children}</p>
		</div>;
	}
}
