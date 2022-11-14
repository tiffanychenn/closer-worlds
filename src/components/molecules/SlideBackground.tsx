import * as React from 'react';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { imagePathToUrl } from '../../utils/utils';
import { BackgroundImage } from '../atoms/image/BackgroundImage';

interface Props {
	bgInfo: { backgroundImage?: string | number };
	sectionImageUrls: SectionImageUrls;
}

export class SlideBackground extends React.Component<Props> {
	render() {
		const { backgroundImage } = this.props.bgInfo;
		const { sectionImageUrls } = this.props;
		let backgroundUrl: string | false = false;
		if (backgroundImage) {
			if (typeof backgroundImage == 'number') {
				backgroundUrl = imagePathToUrl(sectionImageUrls[backgroundImage].path);
			} else {
				backgroundUrl = backgroundImage;
			}
		}

		return backgroundUrl ?
			<BackgroundImage src={backgroundUrl} blur="15px" overlayColor="linear-gradient(#1C262E, #050610)" overlayOpacity={0.8}/>
		  : <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(#1C262E, #050610)'}}></div>
	}
}
