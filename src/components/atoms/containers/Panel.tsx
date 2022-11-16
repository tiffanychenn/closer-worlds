import * as React from 'react';

interface Props {
	children: React.ReactNode;
	bgOpacity: number;
}

export class Panel extends React.Component<Props> {
	static defaultProps = {
		bgOpacity: 0.4,
	};

	render() {
		const { children, bgOpacity } = this.props;

		const rootStyle: React.CSSProperties = {
			position: 'relative',
			width: '100%',
			height: '100%',

			backdropFilter: 'blur(14px)', // TODO: Test
		};

		const containerStyle: React.CSSProperties = {
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: 0, left: 0,
			background: `rgba(3, 6, 28, ${bgOpacity})`,
			borderRadius: '28px',
		};

		// Brilliant solution by https://stackoverflow.com/a/66936639
		const pseudoStyle: React.CSSProperties = {
			position: 'absolute',
			inset: 0,
			borderRadius: '28px',
			padding: '2px',
			background: 'linear-gradient(to bottom, #0E1F7E, rgba(12, 26, 108, 0.12) 20%, rgba(10, 38, 137, 0.54) 80%, #051C9E)',
			mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
			WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
			maskComposite: 'exclude',
			WebkitMaskComposite: 'xor',
			pointerEvents: 'none',
		};

		const innerStyle: React.CSSProperties = {
			margin: '60px',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		};

		return <div style={rootStyle}>
			<div style={containerStyle}>
				<div style={innerStyle}>
					{children}
				</div>
			</div>
			<div style={pseudoStyle}></div>
		</div>;
	}
}
