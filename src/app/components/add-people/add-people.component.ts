import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { SplitBillService } from '../../budget/split-bill/split-bill.service';

@Component({
	selector: 'app-add-people',
	templateUrl: './add-people.component.html',
	styleUrls: ['./add-people.component.scss'],
})
export class AddPeopleComponent implements OnInit {
	form: FormGroup;
	people: string[] = [];

	constructor(
		private modalCtrl: ModalController,
		private splitBillService: SplitBillService
	) {}

	ngOnInit() {
		this.form = new FormGroup({
			name: new FormControl(null, {
				updateOn: 'change',
			}),
		});
	}

	onCancel() {
		this.modalCtrl.dismiss(null, null, 'addPeopleModal');
	}

	onSubmit() {
		this.splitBillService.addPeople(this.people);
		this.modalCtrl.dismiss(null, null, 'addPeopleModal');
	}

	addPeople() {
		this.people.push(this.form.value.name);
		this.form.reset();
	}
}
