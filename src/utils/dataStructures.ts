export class ExplainableGraphNode<T, EdgeType extends (string | number), Explanation> {
	value: T;
	edges: { [e in EdgeType]: Array<{
		toNode: ExplainableGraphNode<T, EdgeType, Explanation>,
		type: EdgeType,
		explanation: Explanation,
	}> };

	constructor(value: T) {
		this.value = value;
		this.edges = {} as any; // Not sure why it won't accept this otherwise--should likely be edited.
	}

	/**
	 * Connects this node to a new node.
	 *
	 * @param {T} value The value to store in the new node.
	 * @param {EdgeType} towardType The type of connection from this -> node.
	 * @param {Explanation} towardExplanation The explanation for the connection from this -> node.
	 * @param {EdgeType} [backType] The type of connection from node -> this. If not specified, towardType is used.
	 * @param {Explanation} [backExplanation] The explanation for the connection from node -> this. If not specified, towardExplanation is used.
	 * @memberof ExplainableGraphNode
	 */
	addNode(value: T, towardType: EdgeType, towardExplanation: Explanation, backType?: EdgeType, backExplanation?: Explanation): ExplainableGraphNode<T, EdgeType, Explanation> {
		// Create a new node
		let node = new ExplainableGraphNode<T, EdgeType, Explanation>(value);
		// Connect it
		this.connectNode(node, towardType, towardExplanation, backType, backExplanation);
		// TODO: Should we be checking for duplicates or something like that? Probably no need for now...
		return node;
	}
	
	/**
	 * Connects this node to another preexisting node in both directions.
	 *
	 * @param {ExplainableGraphNode<T, EdgeType, Explanation>} node The node to which to connect this one, and vice versa.
	 * @param {EdgeType} towardType The type of connection from this -> node.
	 * @param {Explanation} towardExplanation The explanation for the connection from this -> node.
	 * @param {EdgeType} [backType] The type of connection from node -> this. If not specified, towardType is used.
	 * @param {Explanation} [backExplanation] The explanation for the connection from node -> this. If not specified, towardExplanation is used.
	 * @memberof ExplainableGraphNode
	 */
	connectNode(node: ExplainableGraphNode<T, EdgeType, Explanation>, towardType: EdgeType, towardExplanation: Explanation, backType?: EdgeType, backExplanation?: Explanation) {
		// Toward: this -> node
		if (!this.edges[towardType]) {
			this.edges[towardType] = [];
		}
		this.edges[towardType].push({
			toNode: node,
			type: towardType,
			explanation: towardExplanation,
		});
		// Back: node -> this
		if (!node.edges[backType]) {
			node.edges[backType] = [];
		}
		node.edges[backType].push({
			toNode: this,
			type: backType,
			explanation: backExplanation,
		});
	}
}
