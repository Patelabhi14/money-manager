import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController, PopoverController } from '@ionic/angular';

import { SplitBillService } from './split-bill.service';
import { Person } from './person.model';
import { PopOverComponent } from '../../components/pop-over/pop-over.component';
import { AddPeopleComponent } from '../../components/add-people/add-people.component';

@Component({
	selector: 'app-split-bill',
	templateUrl: './split-bill.page.html',
	styleUrls: ['./split-bill.page.scss'],
})
export class SplitBillPage implements OnInit {
	form: FormGroup;
	people: Person[];

	constructor(
		private modalCtrl: ModalController,
		private popOverCtrl: PopoverController,
		private splitBillService: SplitBillService
	) {}

	ngOnInit() {
		this.splitBillService.getPeople().subscribe((people) => {
			this.people = people;
			this.form = new FormGroup({
				amount: new FormControl(null, {
					updateOn: 'change',
					validators: [Validators.required, Validators.min(0)],
				}),
				note: new FormControl(null, { updateOn: 'change' }),
				paidBy: new FormControl(null, {
					updateOn: 'change',
					validators: [Validators.required],
				}),
			});
		});
	}

	onPopOverClick(ev) {
		this.popOverCtrl
			.create({
				component: PopOverComponent,
				componentProps: { people: this.people },
				event: ev,
			})
			.then((popOverEl) => {
				popOverEl.present();
			});
	}

	addPeople() {
		this.modalCtrl
			.create({
				component: AddPeopleComponent,
				id: 'addPeopleModal',
			})
			.then((modalEl) => {
				modalEl.present();
			});
	}

	onAddExpense() {
		const personWhoPaid = this.people.find(
			(person) => person.name === this.form.value.paidBy
		);
		this.splitBillService
			.updateBalance(personWhoPaid.id, this.form.value.amount)
			.subscribe(() => {
				this.form.reset();
			});
	}
}
