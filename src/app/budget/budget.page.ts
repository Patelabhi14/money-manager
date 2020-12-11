import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-budget',
	templateUrl: './budget.page.html',
	styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
	calendar = {
		mode: 'month',
		currentDate: new Date(),
	};

	constructor(private navCtrl: NavController) {}

	ngOnInit() {}

	onDateSelect(event) {
		const date: Date = event.date;
		this.navCtrl.navigateForward(['/', 'budget', date.toISOString()]);
	}

	createNewBudget() {
		this.navCtrl.navigateForward(['/', 'budget', 'new'], {
			queryParams: { date: this.calendar.currentDate.toISOString() },
		});
	}
}
