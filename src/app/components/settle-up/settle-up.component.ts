import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Person } from '../../budget/split-bill/person.model';
import { SettleUpTransaction } from './settle-up-transaction.model';

@Component({
	selector: 'app-settle-up',
	templateUrl: './settle-up.component.html',
	styleUrls: ['./settle-up.component.scss'],
})
export class SettleUpComponent implements OnInit {
	@Input() people: Person[];
	peopleWhoNeedToPay: Person[] = [];
	peopleWhoGetPaid: Person[] = [];
	settleUpTransactions: SettleUpTransaction[] = [];
	totalAmount: number = 0;
	numberOfPeople: number;

	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {
		this.people.forEach((person) => {
			this.totalAmount += person.amountPaid;
			if (person.balance < 0) {
				this.peopleWhoNeedToPay.push(person);
			} else if (person.balance > 0) {
				this.peopleWhoGetPaid.push(person);
			}
		});
		this.numberOfPeople = this.people.length;
		const perHeadAmount = this.totalAmount / this.numberOfPeople;

		this.peopleWhoGetPaid = this.calculateBalance(
			this.peopleWhoGetPaid,
			perHeadAmount
		);
		this.peopleWhoNeedToPay = this.calculateBalance(
			this.peopleWhoNeedToPay,
			perHeadAmount
		);

		this.peopleWhoGetPaid = this.sortArray(this.peopleWhoGetPaid);
		this.peopleWhoNeedToPay = this.sortArray(this.peopleWhoNeedToPay);

		for (
			let personWhoPay = 0;
			personWhoPay < this.peopleWhoNeedToPay.length;
			personWhoPay++
		) {
			for (
				let personWhoGetPaid = 0;
				personWhoGetPaid < this.peopleWhoGetPaid.length;
				personWhoGetPaid++
			) {
				if (this.peopleWhoNeedToPay[personWhoPay].balance < 0) {
					if (this.peopleWhoGetPaid[personWhoGetPaid].balance > 0) {
						const newBalanceOfPersonWhoPays =
							Math.abs(this.peopleWhoNeedToPay[personWhoPay].balance) >
							Math.abs(this.peopleWhoGetPaid[personWhoGetPaid].balance)
								? Math.abs(this.peopleWhoNeedToPay[personWhoPay].balance) -
								  Math.abs(this.peopleWhoGetPaid[personWhoGetPaid].balance)
								: 0;
						const newBalanceOfPersonWhoGetsPaid =
							Math.abs(this.peopleWhoNeedToPay[personWhoPay].balance) <
							Math.abs(this.peopleWhoGetPaid[personWhoGetPaid].balance)
								? Math.abs(this.peopleWhoGetPaid[personWhoGetPaid].balance) -
								  Math.abs(this.peopleWhoNeedToPay[personWhoPay].balance)
								: 0;
						const newPersonWhoPays = new Person(
							this.peopleWhoNeedToPay[personWhoPay].id,
							this.peopleWhoNeedToPay[personWhoPay].name,
							this.peopleWhoNeedToPay[personWhoPay].amountPaid,
							newBalanceOfPersonWhoPays > 0 ? -newBalanceOfPersonWhoPays : 0
						);
						const newPersonWhoGetsPaid = new Person(
							this.peopleWhoGetPaid[personWhoGetPaid].id,
							this.peopleWhoGetPaid[personWhoGetPaid].name,
							this.peopleWhoGetPaid[personWhoGetPaid].amountPaid,
							newBalanceOfPersonWhoGetsPaid
						);
						const newSettleUpTransaction = new SettleUpTransaction(
							newPersonWhoPays.name,
							newPersonWhoGetsPaid.name,
							Math.abs(this.peopleWhoNeedToPay[personWhoPay].balance) >
							Math.abs(this.peopleWhoGetPaid[personWhoGetPaid].balance)
								? Math.abs(this.peopleWhoGetPaid[personWhoGetPaid].balance)
								: Math.abs(this.peopleWhoNeedToPay[personWhoPay].balance)
						);
						this.peopleWhoNeedToPay[personWhoPay] = newPersonWhoPays;
						this.peopleWhoGetPaid[personWhoGetPaid] = newPersonWhoGetsPaid;
						this.settleUpTransactions.push(newSettleUpTransaction);
					}
				}
			}
		}
	}

	onCancel() {
		this.modalCtrl.dismiss(null, null, 'settleUpModal');
	}

	calculateBalance(people: Person[], perHeadAmount: number): Person[] {
		let newPeople: Person[] = [];
		people.forEach((person) => {
			const newPerson = new Person(
				person.id,
				person.name,
				person.amountPaid,
				person.amountPaid - perHeadAmount
			);
			newPeople.push(newPerson);
		});
		return newPeople;
	}

	sortArray(people: Person[]): Person[] {
		return people.sort((a, b) => {
			return Math.abs(b.balance) - Math.abs(a.balance);
		});
	}
}
