import * as React from "react";
import { IMG_BG_DARK_SHADOW } from "../image/ImageCard";

interface Props {
	children: React.ReactNode;
	show: boolean;
	useOverlay: boolean;
}

export class FullscreenModal extends React.Component<Props> {
	static defaultProps = { useOverlay: true };

	render() {
		const { children, show, useOverlay } = this.props;

		const containerStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			display: show ? 'block' : 'none',
		};

		const overlayStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			background: 'rgba(0,0,0,0.5)',
			backdropFilter: 'blur(5px)',
			opacity: show ? 1 : 0,
			transition: 'opacity 0.3s',
		};

		const modalStyle: React.CSSProperties = {
			position: 'relative',
			top: '50%',
			left: '50%',
			transform: show ? 'translate(-50%, -50%)' : 'translate(-40%, -50%)',
			background: '#01041B',
			borderRadius: '20px',
			opacity: show ? 1 : 0,
			transition: 'opacity 0.3s, transform 0.3s',
			width: '75%',
			// height: '75%',
			maxWidth: '600px',
			// maxHeight: '500px',
			overflow: 'hidden',
			boxShadow: IMG_BG_DARK_SHADOW,
		};

		return <div style={containerStyle}>
			{useOverlay && <div style={overlayStyle}></div>}
			<div style={modalStyle}>{children}</div>
		</div>;
	}
}
