import * as React from 'react';
import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import { DiscussionPrompt } from '../atoms/text/Text';
import { Button } from '../atoms/input/Button';
import { Logger } from '../../data/logger';

interface Props {
	children: React.ReactNode;
	isFlipped: boolean;
	onFlip?: () => void;
	buttonId: string;
	logger: Logger;
}

export class DiscussionCard extends React.Component<Props> {
	render() {
		const { children, isFlipped, onFlip, buttonId, logger } = this.props;

		const scene = css({
			width: '100%',
			perspective: '1000px',
			perspectiveOrigin: 'center',
		});

		const card = css({
			width: '100%',
			// Height is left arbitrary.
			position: 'relative',
			transition: 'transform 1.25s',
			transformStyle: 'preserve-3d',
			transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
			borderRadius: '28px',
			transformOrigin: 'center',
		});
		
		const cardFace: CSSInterpolation = {
			width: '100%',
			// Leaving height arbitrary again.
			backfaceVisibility: 'hidden',
			borderRadius: '28px',
		};

		// The side with the discussion question
		const cardFront = css(cardFace, {
			transform: 'rotateY(180deg)',
		});

		// The side with just an image and a button.
		const cardBack = css(cardFace, {
			// Match height of front.
			position: 'absolute',
			top: 0, left: 0, right: 0, bottom: 0,
			boxSizing: 'border-box',
			border: 'solid 2px #ffdc85',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundImage: 'url(./assets/discussion_card_back.png)',
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			':before': {
				content: '""',
				border: 'solid 3px rgba(0,132,253,0.8)', // #0084FD',
				boxSixing: 'border-box',
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				borderRadius: '26px',
				background: 'rgba(5,18,64,0.35)',
			}
		});

		return <div css={scene}>
			<div css={card}>
				<div css={cardFront}>
					<DiscussionPrompt>{children}</DiscussionPrompt>
				</div>
				<div css={cardBack}>
					<div style={{zIndex: 1, borderRadius: '12px', boxShadow: '0 0 20px 10px rgba(0,0,0,0.25)'}}>
						<Button text="Reveal"
								id={buttonId}
								logger={logger}
								onClick={onFlip}/>
					</div>
				</div>
			</div>
		</div>;
	}
}

interface StatefulProps {
	children: React.ReactNode;
	onFlip?: () => void;
	buttonId: string;
	logger: Logger;
}

interface State {
	isFlipped: boolean;
}

export class StatefulDiscussionCard extends React.Component<StatefulProps, State> {
	constructor(props: StatefulProps) {
		super(props);
		this.state = { isFlipped: false };
	}

	render() {
		const { children, onFlip, buttonId, logger } = this.props;
		const { isFlipped } = this.state;
		return <DiscussionCard logger={logger}
							   buttonId={buttonId}
							   isFlipped={isFlipped}
							   onFlip={() => {
									this.setState({
										isFlipped: true,
									}, onFlip);
							   }}>
			{children}
		</DiscussionCard>;
	}
}
