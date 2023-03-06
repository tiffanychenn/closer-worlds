import * as React from 'react';
import { Logger } from '../../data/logger';
import { BLUE_BG_LIGHT_SHADOW, ImageCard } from '../atoms/image/ImageCard';

interface Props {
	src: string;
	loading: boolean; // Once done loading, allow next.
	
	size: string; // Includes CSS units.
	sizeSide: 'width' | 'height';
	boxShadow: string;

	buttonId: string;
	logger: Logger;
}

export class LoadingImageCardNoNext extends React.Component<Props> {
	static defaultProps = { sizeSide: 'width', size: '100%', boxShadow: BLUE_BG_LIGHT_SHADOW };
	
	render() {
		const { loading, src, size, sizeSide, buttonId, logger, boxShadow } = this.props;
		
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

		let centeredEl = undefined
		if (loading) {
			centeredEl = <img src="./assets/spinner.svg" width="20%" height="20%"/>;
		}

		return <div style={containerStyle}>
			<ImageCard src={src} blur='25px' size="100%" sizeSide={sizeSide}
					   boxShadow={boxShadow}/>
			<div style={centeredStyle}>{centeredEl}</div>
		</div>;
	}
}
