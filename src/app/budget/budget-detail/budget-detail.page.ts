import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-budget-detail',
	templateUrl: './budget-detail.page.html',
	styleUrls: ['./budget-detail.page.scss'],
})
export class BudgetDetailPage implements OnInit {
	date: string;

	constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('date')) {
				this.navCtrl.navigateBack('/budget');
			}
			const param = new Date(paramMap.get('date'));
			this.date =
				param.getDate().toString() +
				' ' +
				param.toLocaleString('default', { month: 'short' }) +
				' ' +
				param.getFullYear();
		});
	}
}
