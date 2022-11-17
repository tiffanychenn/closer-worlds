import * as React from 'react';

interface Props {
	src: string;
	size: string; // Includes CSS units.
	sizeSide: 'width' | 'height';
	boxShadow?: string;
	blur: string;
}

export class ImageCard extends React.Component<Props> {
	static defaultProps = { size: '300px', sizeSide: 'width', blur: "0px" };

	render() {
		const { src, size, sizeSide, boxShadow, blur } = this.props;
		const style: React.CSSProperties = {
			aspectRatio: '1 / 1',
			// boxShadow: `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})`,
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
