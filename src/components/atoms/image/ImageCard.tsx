import * as React from 'react';

interface Props {
	src: string;
	size: string; // Includes CSS units.
	shadowOpacity: number;
}

export class ImageCard extends React.Component<Props> {
	static defaultProps = { size: '300px', shadowOpacity: 0.3 };

	render() {
		const { src, size, shadowOpacity } = this.props;
		const style: React.CSSProperties = {
			width: size,
			aspectRatio: '1 / 1',
			boxShadow: `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})`,
			borderRadius: '16px',
			objectFit: 'cover',
			objectPosition: 'center center',
		};
		return <img src={src} style={style}/>;
	}
}
