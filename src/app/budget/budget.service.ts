import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import * as uuid from 'uuid';

import { Entry } from './budget.model';

@Injectable({
	providedIn: 'root',
})
export class BudgetService {
	private _budget = new BehaviorSubject<Entry[]>([
		new Entry(uuid.v4(), 'Earning', 789, new Date(), 'Cash', ''),
		new Entry(uuid.v4(), 'Earning', 1000, new Date('12/9/2020'), 'Cash', ''),
		new Entry(
			uuid.v4(),
			'Earning',
			15000,
			new Date('12/11/2020'),
			'Salary',
			'nothing'
		),
		new Entry(uuid.v4(), 'Expense', 454, new Date('12/10/2020'), 'Others', ''),
		new Entry(uuid.v4(), 'Expense', 100, new Date('12/1/2020'), 'Food', ''),
		new Entry(uuid.v4(), 'Expense', 60, new Date('12/1/2020'), 'Others', ''),
		new Entry(
			uuid.v4(),
			'Expense',
			500,
			new Date('12/5/2020'),
			'Transport',
			''
		),
		new Entry(
			uuid.v4(),
			'Expense',
			150,
			new Date('12/6/2020'),
			'Transport',
			''
		),
	]);

	get budget() {
		return this._budget.asObservable();
	}

	constructor() {}

	addBudget(
		type: string,
		amount: number,
		date: Date,
		category: string,
		note: string
	) {
		const newEntry = new Entry(
			uuid.v4(),
			type,
			amount,
			new Date(date),
			category,
			note
		);
		return this.budget.pipe(
			take(1),
			tap((entries) => {
				this._budget.next(entries.concat(newEntry));
			})
		);
	}

	updateEntry(
		id: string,
		type: string,
		amount: number,
		date: Date,
		category: string,
		note: string
	) {
		return this.budget.pipe(
			take(1),
			tap((entries) => {
				const updatedEntryIndex = entries.findIndex((e) => e.id === id);
				const updatedEntries = [...entries];
				updatedEntries[updatedEntryIndex] = new Entry(
					id,
					type,
					amount,
					new Date(date),
					category,
					note
				);
				this._budget.next(updatedEntries);
			})
		);
	}

	getBudget(date: Date) {
		return this.budget.pipe(
			take(1),
			map((resData) => {
				let matchedEntries = [];
				resData.forEach((d) => {
					if (d.date.toDateString() === date.toDateString())
						matchedEntries.push(d);
				});
				return matchedEntries;
			})
		);
	}

	getSingleEntry(id: string) {
		return this.budget.pipe(
			take(1),
			map((entries) => {
				return entries.find((e) => e.id === id);
			})
		);
	}

	getEntriesDetail() {
		return this.budget.pipe(
			map((entries) => {
				let earning: number = 0;
				let expense: number = 0;
				let total: number = 0;
				entries.forEach((e) => {
					if (e.type == 'Earning') {
						earning += e.amount;
					} else {
						expense += e.amount;
					}
				});
				total = earning - expense;
				return { earning: earning, expense: expense, total: total };
			})
		);
	}

	getAllEntries() {
		return this.budget;
	}

	getAllExpenseEntries() {
		return this.budget.pipe(
			map((entries) => {
				return entries.filter((e) => e.type === 'Expense');
			})
		);
	}
}
