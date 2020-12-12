import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController } from '@ionic/angular';

import { Entry } from './budget.model';
import { BudgetService } from './budget.service';

@Component({
	selector: 'app-budget',
	templateUrl: './budget.page.html',
	styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
	earning: number;
	expense: number;
	total: number;
	calendar = {
		mode: 'month',
		currentDate: new Date(),
	};
	entries: Entry[];

	constructor(
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private budgetService: BudgetService
	) {}

	ngOnInit() {
		this.budgetService.getEntriesDetail().subscribe((resData) => {
			this.earning = resData.earning;
			this.expense = resData.expense;
			this.total = resData.total;
		});
		this.budgetService.getAllEntries().subscribe((entries) => {
			this.entries = entries;
			console.log(this.entries);
		});
	}

	onDateSelect(event) {
		const date: Date = event.date;
		this.navCtrl.navigateForward([date.toISOString()], {
			relativeTo: this.route,
		});
	}

	createNewBudget() {
		this.navCtrl.navigateForward(['new'], {
			relativeTo: this.route,
			queryParams: { date: this.calendar.currentDate.toISOString() },
		});
	}
}
