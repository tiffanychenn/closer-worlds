import * as React from 'react';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { getSectionImageOrString, imagePathToUrl } from '../../utils/utils';
import { BackgroundImage } from '../atoms/image/BackgroundImage';

interface Props {
	bgInfo: { backgroundImage?: string | number, blurBG?: boolean, overlayBG?: boolean };
	sectionImageUrls: SectionImageUrls;
}

export class SlideBackground extends React.Component<Props> {
	render() {
		const { backgroundImage, blurBG, overlayBG } = this.props.bgInfo;
		const { sectionImageUrls } = this.props;
		
		const backgroundUrl = getSectionImageOrString(backgroundImage, sectionImageUrls);

		return backgroundUrl ?
			<BackgroundImage src={backgroundUrl}
							 blur={blurBG ? "15px" : "0px"}
							 overlayColor={overlayBG ? "linear-gradient(#1C262E, #050610)" : undefined}
							 overlayOpacity={overlayBG ? 0.3 : 0}/>
		  : <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(#1C262E, #050610)'}}></div>
	}
}
