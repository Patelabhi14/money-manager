import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import * as _ from 'lodash';

import { Entry } from '../budget.model';
import { BudgetService } from '../budget.service';

@Component({
	selector: 'app-analysis',
	templateUrl: './analysis.page.html',
	styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
	doughnutChart: Chart;
	entries: Entry[];

	constructor(private budgetService: BudgetService) {}

	ngOnInit() {
		this.budgetService.getAllExpenseEntries().subscribe((entries) => {
			this.entries = entries;
			const data = _.groupBy(this.entries, 'category');
			let label = [];
			let amount = [];
			for (let d in data) {
				label.push(d);
				let totalAmount = 0;
				data[d].forEach((e) => {
					totalAmount += e.amount;
				});
				amount.push(totalAmount);
			}
			this.doughnutChart = new Chart('doughnutCanvas', {
				type: 'doughnut',
				data: {
					labels: label,
					datasets: [
						{
							label: '# of Votes',
							data: amount,
							backgroundColor: [
								'#FF6384',
								'#36A2EB',
								'#FFCE56',
								'#FF6384',
								'#36A2EB',
								'#FFCE56',
							],
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
				},
			});
		});
	}

	getSimilarEntries(arr: Entry[]) {}
}
