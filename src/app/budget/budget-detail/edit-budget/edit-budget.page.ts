import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NavController } from '@ionic/angular';

import { BudgetService } from '../../budget.service';

@Component({
	selector: 'app-edit-budget',
	templateUrl: './edit-budget.page.html',
	styleUrls: ['./edit-budget.page.scss'],
})
export class EditBudgetPage implements OnInit {
	form: FormGroup;
	entryId: string;

	constructor(
		private budgetService: BudgetService,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((params) => {
			if (!params.has('id')) {
				this.navCtrl.navigateBack(['../../'], { relativeTo: this.route });
			}
			this.entryId = params.get('id');
			this.budgetService.getSingleEntry(this.entryId).subscribe((entry) => {
				this.form = new FormGroup({
					type: new FormControl(entry.type, {
						updateOn: 'change',
						validators: [Validators.required],
					}),
					amount: new FormControl(entry.amount, {
						updateOn: 'change',
						validators: [Validators.required],
					}),
					date: new FormControl(entry.date.toISOString(), {
						updateOn: 'change',
						validators: [Validators.required],
					}),
					category: new FormControl(entry.category, {
						updateOn: 'change',
						validators: [Validators.required],
					}),
					note: new FormControl(entry.note, {
						updateOn: 'change',
					}),
				});
			});
		});
	}

	onUpdate() {
		this.budgetService
			.updateEntry(
				this.entryId,
				this.form.value.type,
				this.form.value.amount,
				this.form.value.date,
				this.form.value.category,
				this.form.value.note
			)
			.subscribe(() => {
				this.navCtrl.navigateBack(['/budget']);
			});
	}
}
