import * as React from 'react';

export function playerRoleToNumber(currPlayerRole: 'landscape' | 'buildings' | 'both', landscapePlayerNumber: 1 | 2): 1 | 2 | 'both' {
	if (currPlayerRole == 'both') {
		return 'both';
	}
	if (currPlayerRole == 'landscape') {
		return landscapePlayerNumber;
	}
	// Otherwise, the current player is the one in charge of buildings
	return landscapePlayerNumber == 1 ? 2 : 1;
}

export function replacePlayerText(text: string, currPlayerNumber: 1 | 2 | 'both'): string {
	const curr = currPlayerNumber == 1 ? 'player 1' : (currPlayerNumber == 2 ? 'player 2' : 'both players');
	const other = currPlayerNumber == 1 ? 'player 2' : (currPlayerNumber == 2 ? 'player 1' : 'both players');
	const Curr = curr.substring(0, 1).toUpperCase() + curr.substring(1);
	const Other = other.substring(0, 1).toUpperCase() + other.substring(1);
	let result = text;
	result = result.replace('\{curr\}', curr);
	result = result.replace('\{Curr\}', Curr);
	result = result.replace('\{other\}', other);
	result = result.replace('\{Other\}', Other);
	return result;
}

export function renderBoldText(text: string): React.ReactNode {
	let nodes = [];
	let curr = "";
	let inBoldSection = false;

	for (let i = 0; i < text.length; i++) {
		if (text[i] == '*') {
			if (curr !== "") {
				if (inBoldSection) {
					nodes.push(<strong style={{whiteSpace: 'pre-wrap'}}>{curr}</strong>);
				} else {
					nodes.push(<span style={{whiteSpace: 'pre-wrap'}}>{curr}</span>);
				}
			}
			inBoldSection = !inBoldSection;
			curr = "";
		} else {
			curr += text[i];
		}
	}

	if (curr != "") {
		if (inBoldSection) {
			nodes.push(<strong style={{whiteSpace: 'pre-wrap'}}>{curr}</strong>);
		} else {
			nodes.push(<span style={{whiteSpace: 'pre-wrap'}}>{curr}</span>);
		}
	}

	return <>{...nodes}</>;
}
