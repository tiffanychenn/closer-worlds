import * as React from 'react';

interface Props {
	src: string;
	size: string; // Includes CSS units.
	sizeSide: 'width' | 'height';
	boxShadow?: string;
	blur: string;
}

export const BLUE_BG_LIGHT_SHADOW = "0 0 50px 30px rgba(170, 189, 255, 0.5)";
export const IMG_BG_DARK_SHADOW = "0 4 20px 0 rgba(0, 0, 0, 0.5)";

export class ImageCard extends React.Component<Props> {
	static defaultProps = { size: '300px', sizeSide: 'width', blur: "0px" };

	render() {
		const { src, size, sizeSide, boxShadow, blur } = this.props;
		const style: React.CSSProperties = {
			aspectRatio: '1 / 1',
			boxShadow: boxShadow,
			borderRadius: '16px',
			objectFit: 'cover',
			objectPosition: 'center center',
			filter: `blur(${blur})`,
		};
		if (sizeSide == 'width') {
			style.width = size;
		} else {
			style.height = size;
		}
		return <img src={src} style={style}/>;
	}
}
