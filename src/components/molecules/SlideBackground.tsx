import * as React from 'react';
import { SectionImageUrls } from '../../reducers/promptReducer';
import { getSectionImageOrString } from '../../utils/utils';
import { BackgroundImage } from '../atoms/image/BackgroundImage';

interface Props {
	bgInfo: { backgroundImage?: string | number, blurBG?: boolean, overlayBG?: boolean };
	sectionImageUrls: SectionImageUrls;
}

// const OVERLAY_GRADIENT = "linear-gradient(#1C262E, #050610)";
// const OVERLAY_GRADIENT = "linear-gradient(#2E6698, #2E1B80)";
// const OVERLAY_GRADIENT = "linear-gradient(#0A2772, #14074E)";
const OVERLAY_GRADIENT = "#051240";

export class SlideBackground extends React.Component<Props> {
	render() {
		const { backgroundImage, blurBG, overlayBG } = this.props.bgInfo;
		const { sectionImageUrls } = this.props;
		
		const backgroundUrl = getSectionImageOrString(backgroundImage, sectionImageUrls);

		return backgroundUrl ?
			<BackgroundImage src={backgroundUrl}
							 blur={blurBG ? "20px" : "0px"}
							 overlayColor={overlayBG ? OVERLAY_GRADIENT : undefined}
							 overlayOpacity={overlayBG ? 0.4 : 0}/>
		  : <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(#1C262E, #050610)'}}></div>
	}
}
