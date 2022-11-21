import * as React from 'react';
import { spread } from '../../../utils/utils';
import { LoggedFormElementComponent, LoggedFormElementProps } from './LoggedFormElement';
import RadioButton from './RadioButton';

interface Props extends LoggedFormElementProps {
	ids: string[];
	labels: string[];
	orientation: 'vertical' | 'horizontal';
	onSelect?: (value: string) => void;
}

export class RadioGroup extends LoggedFormElementComponent<Props> {
	static defaultProps = { orientation: 'vertical' };

	render() {
		const { ids, labels, orientation, logger, id, onSelect } = this.props;

		const isVertical = orientation == 'vertical';
		const style: React.CSSProperties = {
			display: 'flex',
			flexDirection: isVertical ? 'column' : 'row',
			gap: isVertical ? '16px' : '100px',
		};

		const idxs = spread(Array(ids.length).keys());
		return <div style={style}>{...idxs.map(i =>
			<RadioButton logger={logger}
						 label={labels[i]}
						 id={ids[i]}
						 name={id}
						 onInput={() => {
							this.onAnyEvent(labels[i])
							if (onSelect) {
								onSelect(labels[i]);
							}
						 }}/>
			)}</div>;
	}
}
