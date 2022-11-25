import * as React from 'react';

interface Props {
	src?: string;
	blur: string; // Blur quantity, including CSS units.
	overlayColor?: string; // If none is specified, then no overlay will be present.
	overlayOpacity: number;
}

export class BackgroundImage extends React.Component<Props> {
	static defaultProps = { blur: '0', overlayOpacity: 0.2 };

	render() {
		const { src, blur, overlayColor, overlayOpacity } = this.props;
		return <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
			{src && (
				src[0] == '#'
					? <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: src}}></div>
					: <img src={src} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', filter: `blur(${blur})`}}/>
			)}
			{overlayColor && <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: overlayColor, opacity: overlayOpacity}}></div>}
		</div>;
	}
}
