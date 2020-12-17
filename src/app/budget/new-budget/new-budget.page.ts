import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

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
		private navCtrl: NavController,
		private toastCtrl: ToastController
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
					validators: [Validators.required, Validators.min(0)],
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
		this.toastCtrl
			.create({
				message: 'Entry Successfully created.',
				duration: 2000,
			})
			.then((toastEl) => {
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
						toastEl.present();
						this.navCtrl.navigateBack(['/', 'budget']);
					});
			});
	}
}
