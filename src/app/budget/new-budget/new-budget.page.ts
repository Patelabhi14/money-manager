import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { BudgetService } from '../budget.service';

@Component({
	selector: 'app-new-budget',
	templateUrl: './new-budget.page.html',
	styleUrls: ['./new-budget.page.scss'],
})
export class NewBudgetPage implements OnInit {
	form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private budgetService: BudgetService,
		private navCtrl: NavController
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			const date = params['date'];
			this.form = new FormGroup({
				type: new FormControl(null, {
					updateOn: 'change',
					validators: [Validators.required],
				}),
				amount: new FormControl(null, {
					updateOn: 'change',
					validators: [Validators.required],
				}),
				date: new FormControl(date, {
					updateOn: 'change',
					validators: [Validators.required],
				}),
				category: new FormControl(null, {
					updateOn: 'change',
					validators: [Validators.required],
				}),
				note: new FormControl(null, {
					updateOn: 'change',
				}),
			});
		});
	}

	onSubmit() {
		this.budgetService
			.addBudget(
				this.form.value.type,
				this.form.value.amount,
				this.form.value.date,
				this.form.value.category,
				this.form.value.note
			)
			.subscribe(() => {
				this.form.reset();
				this.navCtrl.navigateBack(['/', 'budget']);
			});
	}
}
