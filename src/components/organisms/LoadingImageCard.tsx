import * as React from 'react';
import { Logger } from '../../data/logger';
import { BLUE_BG_LIGHT_SHADOW, ImageCard } from '../atoms/image/ImageCard';
import { Button } from '../atoms/input/Button';

interface Props {
	src: string;
	allowNext: boolean; // Once done loading, allow next.
	onNext?: () => void;
	
	size?: string; // Includes CSS units.
	sizeSide: 'width' | 'height';

	buttonId: string;
	logger: Logger;
}

export class LoadingImageCard extends React.Component<Props> {
	static defaultProps = { sizeSide: 'width' };
	
	render() {
		const { allowNext, onNext, src, size, sizeSide, buttonId, logger } = this.props;
		
		const centeredStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0, left: 0, right: 0, bottom: 0,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		};
		
		const containerStyle: React.CSSProperties = {
			position: 'relative',
		};

		if (sizeSide == 'width') {
			containerStyle.width = size;
		} else {
			containerStyle.height = size;
		}

		let centeredEl;
		if (allowNext) {
			centeredEl = <Button id={buttonId} logger={logger} onClick={onNext} text="See Result"/>;
		} else {
			centeredEl = <img src="./assets/spinner.svg" width="20%" height="20%"/>;
		}

		return <div style={containerStyle}>
			<ImageCard src={src} blur='25px' size="100%" sizeSide={sizeSide}
					   boxShadow={BLUE_BG_LIGHT_SHADOW}/>
			<div style={centeredStyle}>{centeredEl}</div>
		</div>;
	}
}
