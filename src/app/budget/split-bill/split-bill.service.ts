import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as uuid from 'uuid';

import { Person } from './person.model';

@Injectable({
	providedIn: 'root',
})
export class SplitBillService {
	private _totalAmount: number = 0;
	private _people = new BehaviorSubject<Person[]>([
		new Person('e13ccf04-8c33-41c6-b895-dad13d3f109a', 'abhi patel', 765, 23),
		new Person(
			'8fc9f190-c34c-4908-a640-3ecee680f398',
			'vaibhav khairnar',
			985,
			188
		),
		new Person(
			'9468cef6-4d6e-4144-9b40-8ecbe3463d4e',
			'gautam karnavat',
			453,
			-211
		),
		new Person(
			'0168cef6-414e-4144-9b40-8ecbe3463d4e',
			'saurabh jadhav',
			0,
			-550.75
		),
	]);

	get people() {
		return this._people.asObservable();
	}

	set setTotalAmount(totalAmount) {
		this._totalAmount = totalAmount;
	}

	get getTotalAmount() {
		return this._totalAmount;
	}

	constructor() {}

	getPeople() {
		return this.people;
	}

	addPeople(people: string[]) {
		let newPeople: Person[] = [];
		people.forEach((p) => {
			newPeople.push(new Person(uuid.v4(), p, 0, 0));
		});
		this._people.next(newPeople);
	}

	updateBalance(id: string, amount: number) {
		return this.people.pipe(
			take(1),
			map((people) => {
				const perHeadAmount = amount / people.length;
				let newPeople: Person[] = [];
				people.forEach((person) => {
					if (person.id !== id) {
						const newBalanceOfPersonWhoDintPaid = new Person(
							person.id,
							person.name,
							person.amountPaid,
							person.balance - Math.abs(perHeadAmount)
						);
						newPeople.push(newBalanceOfPersonWhoDintPaid);
					} else {
						let newBalanceOfPersonWhoPaid = new Person(
							person.id,
							person.name,
							person.amountPaid + amount,
							2 * perHeadAmount - Math.abs(person.balance)
						);
						newPeople.push(newBalanceOfPersonWhoPaid);
					}
				});
				this._people.next(newPeople);
			})
		);
	}
}
