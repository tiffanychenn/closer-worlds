export interface LoggerEntry {
	formElemId: string;
	value: any; // Should be something that's serializable as JSON!
}

export class Logger {
	private entries: { [timeSinceEpoch: number]: Array<LoggerEntry> }; // FIXME: It's possible that this doesn't need to be an array, but for safety, it is. See if it's necessary, though.
	private timesPerId: { [formElemId: string]: Array<number> };

	constructor(readonly storeData?: (entries: { [timeSinceEpoch: number]: Array<LoggerEntry> }, timesPerId: { [formElemId: string]: Array<number> }) => void) {
		this.entries = {};
		this.timesPerId = {};
	}

	log(formElemId: string, value: any) {
		const timeSinceEpoch = Date.now();
		
		if (!this.entries[timeSinceEpoch]) {
			this.entries[timeSinceEpoch] = [];
		}
		this.entries[timeSinceEpoch].push({ formElemId, value });

		if (!this.timesPerId[formElemId]) {
			this.timesPerId[formElemId] = [];
		}
		this.timesPerId[formElemId].push(timeSinceEpoch);

		if (this.storeData) {
			this.storeData(this.entries, this.timesPerId);
		}
	}
}
