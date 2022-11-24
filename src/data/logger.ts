// export interface LoggerEntry {
// 	formElemId: string;
// 	value: any; // Should be something that's serializable as JSON!
// }

type LoggerEntriesType = { [timeSinceEpoch: number]: { [formElemId: string]: any } };
type LoggerTimesPerIdType = { [formElemId: string]: Array<number> };

export class Logger {
	private entries: LoggerEntriesType;
	private timesPerId: LoggerTimesPerIdType;
	private listeners: { [id: string]: (changedFormElemId: string) => void };

	constructor(readonly storeData?: (entries: { [timeSinceEpoch: number]: { [formElemId: string]: any } }, timesPerId: { [formElemId: string]: Array<number> }) => void) {
		this.entries = {};
		this.timesPerId = {};
		this.listeners = {};
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

		for (let listenerId in this.listeners) {
			this.listeners[listenerId](formElemId);
		}
	}

	/**
	 * Retrieves the most recent values logged for a set of form element IDs.
	 * @param formElemIds An array of form element IDs for which to search.
	 * @returns A dictionary indexed by the form element IDs. If a value is undefined, then no value has yet been logged for that ID.
	 */
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

	dumpData(): { entries: LoggerEntriesType, timesPerId: LoggerTimesPerIdType } {
		return {
			entries: JSON.parse(JSON.stringify(this.entries)),
			timesPerId: JSON.parse(JSON.stringify(this.timesPerId)),
		};
	}

	/**
	 * Retrieves the most recent values logged for a set of form element IDs.
	 * @param formElemIds An array of form element IDs for which to search.
	 * @returns true if successful
	 */
	loadPreviousExperimentData(loggingData: {entries: LoggerEntriesType, timesPerId: LoggerTimesPerIdType}): boolean {
		this.entries = {...loggingData.entries};
		this.timesPerId = {...loggingData.timesPerId};
		return true;
	}

	addListener(id: string, listener: (changedFormElemId: string) => void) {
		this.listeners[id] = listener;
	}

	removeListener(id: string) {
		delete this.listeners[id];
	}
}
