import * as React from 'react';
import { Logger } from '../../data/logger';
import { Slider } from '../atoms/input/Slider';

interface State {
	value: number;
}

interface Props {
	logger: Logger;
}

export class ClosenessSlider extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { value: 50 };
	}

	render() {
		const { logger } = this.props;

		return <div style={{display: 'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
             <svg width={1000} height={110}>
                <circle cx={500 - ((100 - this.state.value) / 2)} cy="55" r="50" stroke="white" stroke-width="3" fillOpacity={0} />
                <circle cx={500 + ((100 - this.state.value) / 2)} cy="55" r="50" stroke="white" stroke-width="3" fillOpacity={0} />
            </svg>
            <div style={{width: "1000px"}}>
                <Slider id="type-of-people-slider"
				    logger={logger}
					leftLabel="Not at all close"
					rightLabel="Super close"
                    onChange={(value: number) => this.setState({value: value})}
                    />
            </div>
        </div>;
	}
}
