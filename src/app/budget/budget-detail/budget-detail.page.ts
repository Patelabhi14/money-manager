import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController } from '@ionic/angular';

import { Entry } from '../budget.model';
import { BudgetService } from '../budget.service';

@Component({
	selector: 'app-budget-detail',
	templateUrl: './budget-detail.page.html',
	styleUrls: ['./budget-detail.page.scss'],
})
export class BudgetDetailPage implements OnInit {
	date: string;
	budget: Entry[];

	constructor(
		private route: ActivatedRoute,
		private navCtrl: NavController,
		private budgetService: BudgetService
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('date')) {
				this.navCtrl.navigateBack('/budget');
			}
			const param = new Date(paramMap.get('date'));
			this.formatDate(param);
			this.budgetService.getBudget(param).subscribe((budget) => {
				this.budget = budget;
			});
		});
	}

	formatDate(date: Date) {
		this.date =
			date.getDate().toString() +
			' ' +
			date.toLocaleString('default', { month: 'short' }) +
			' ' +
			date.getFullYear();
	}

	editEntry(id: string) {
		this.navCtrl.navigateForward(['edit', id], { relativeTo: this.route });
	}
}
