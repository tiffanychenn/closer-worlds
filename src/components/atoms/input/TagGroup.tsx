import { LoggedFormElementComponent, LoggedFormElementProps } from "./LoggedFormElement";
import { Tag, TagInput } from "./Tag";

interface Props extends LoggedFormElementProps {
	tags: string[];
	includeInput: boolean;
	onSelectTag?: (value: string, isSelected: boolean) => void;
	onAddTag?: (value: string) => void;
	placeholder?: string;
}

interface State {
	addedValues: string[];
	selected: string[];
}

export class TagGroup extends LoggedFormElementComponent<Props, State> {
	static defaultProps = { includeInput: false };

	constructor(props: Props) {
		super(props);
		this.state = {
			selected: [],
			addedValues: [],
		};
	}

	render() {
		const { id, logger, tags, includeInput, placeholder, onSelectTag, onAddTag } = this.props;
		const { selected, addedValues } = this.state;

		const allTags = [...tags, ...addedValues];
		const tagEls = allTags.map(x => {
			let subId = x.replace(/\s+/g, "-");
			return <Tag logger={logger}
						id={`${id}-${subId}`}
						text={x}
						startAsSelected={selected.indexOf(x) >= 0}
						onClick={(isSelected) => {
				const sel = [...selected];
				const idx = sel.indexOf(x);
				if (isSelected && idx < 0) {
					sel.push(x);
					this.setState({ selected: sel });
					this.onAnyEvent(JSON.stringify(sel));
				} else if (!isSelected && idx >= 0) {
					sel.splice(idx, 1);
					this.setState({ selected: sel });
					this.onAnyEvent(JSON.stringify(sel));
				}
				if (onSelectTag) onSelectTag(x, isSelected);
			}}/>
		});

		if (includeInput) {
			tagEls.push(<TagInput logger={logger}
								  id={`${id}-!input`}
								  placeholder={placeholder}
								  onAddTag={value => {
				if (tags.indexOf(value.toLowerCase()) < 0 && addedValues.indexOf(value.toLowerCase()) < 0) {
					const sel = [...selected, value];
					this.onAnyEvent(JSON.stringify(sel));
					this.setState({
						addedValues: [...addedValues, value],
						selected: sel,
					});
					if (onAddTag) onAddTag(value);
				}
			}}/>);
		}

		const containerStyle: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			gap: '20px',
		};

		return <div style={containerStyle}>{...tagEls}</div>
	}
}
