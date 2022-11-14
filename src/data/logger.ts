// export interface LoggerEntry {
// 	formElemId: string;
// 	value: any; // Should be something that's serializable as JSON!
// }

export class Logger {
	private entries: { [timeSinceEpoch: number]: { [formElemId: string]: any } };
	private timesPerId: { [formElemId: string]: Array<number> };

	constructor(readonly storeData?: (entries: { [timeSinceEpoch: number]: { [formElemId: string]: any } }, timesPerId: { [formElemId: string]: Array<number> }) => void) {
		this.entries = {};
		this.timesPerId = {};
	}

	log(formElemId: string, value: any) {
		const timeSinceEpoch = Date.now();
		
		if (!this.entries[timeSinceEpoch]) {
			this.entries[timeSinceEpoch] = {};
		}
		this.entries[timeSinceEpoch][formElemId] = value;

		if (!this.timesPerId[formElemId]) {
			this.timesPerId[formElemId] = [];
		}
		this.timesPerId[formElemId].push(timeSinceEpoch);

		if (this.storeData) {
			this.storeData(this.entries, this.timesPerId);
		}
	}

	getLatestValues(formElemIds: Array<string>): { [formElemId: string]: any } {
		let result: { [formElemId: string]: any } = {};
		for (let id of formElemIds) {
			if (!this.timesPerId[id] || this.timesPerId[id].length == 0) {
				result[id] = undefined;
			} else {
				let timesPerId = this.timesPerId[id];
				let stamp = timesPerId[timesPerId.length - 1];
				result[id] = this.entries[stamp][id];
			}
		}
		return result;
	}

	dumpData(): { entries: typeof this.entries, timesPerId: typeof this.timesPerId } {
		return {
			entries: JSON.parse(JSON.stringify(this.entries)),
			timesPerId: JSON.parse(JSON.stringify(this.timesPerId)),
		};
	}
}
