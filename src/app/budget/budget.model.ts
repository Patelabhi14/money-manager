export class Entry {
	constructor(
		public id: string,
		public type: string,
		public amount: number,
		public date: Date,
		public category: string,
		public note: string
	) {}
}
