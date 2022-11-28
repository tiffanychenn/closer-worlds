import * as React from 'react';

interface Props {
	src: string;
	size: string; // Includes CSS units.
	maxOtherSize?: string;
	sizeSide: 'width' | 'height';
	boxShadow?: string;
	blur: string;
	contain: boolean;
}

export const BLUE_BG_LIGHT_SHADOW = "0 0 50px 20px rgba(170, 189, 255, 0.5)";
export const IMG_BG_DARK_SHADOW = "0 4px 20px 0 rgba(0, 0, 0, 0.5)";

export class ImageCard extends React.Component<Props> {
	static defaultProps = { size: '100%', sizeSide: 'width', blur: "0px", contain: false, };

	// FIXME: This component is extremely broken. It does aspect ratios completely incorrectly.
	// Not worth fixing for this project because it doesn't really need to be responsive, but...
	// it's not pretty.

	render() {
		const { src, size, sizeSide, boxShadow, blur, maxOtherSize, contain } = this.props;

		const style: React.CSSProperties = {
			aspectRatio: '1 / 1',
			boxShadow: contain ? undefined : boxShadow,
			borderRadius: '16px',
			objectFit: contain ? 'contain' : 'cover',
			objectPosition: 'center center',
			filter: `blur(${blur})`,
		};

		if (sizeSide == 'width') {
			style.width = size;
			if (maxOtherSize) style.maxHeight = maxOtherSize;
		} else {
			style.height = size;
			if (maxOtherSize) style.maxWidth = maxOtherSize;
		}

		return <img src={src} style={style}/>;
	}
}
