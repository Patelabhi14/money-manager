import { Component, Input, OnInit } from '@angular/core';

import { ModalController, PopoverController } from '@ionic/angular';

import { Person } from '../../budget/split-bill/person.model';
import { SettleUpComponent } from '../settle-up/settle-up.component';

@Component({
	selector: 'app-pop-over',
	templateUrl: './pop-over.component.html',
	styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent implements OnInit {
	@Input() people: Person[];

	constructor(
		private modalCtrl: ModalController,
		private popOverCtrl: PopoverController
	) {}

	ngOnInit() {}

	onSettleUp() {
		this.popOverCtrl.dismiss();
		this.modalCtrl
			.create({
				component: SettleUpComponent,
				componentProps: { people: this.people },
				id: 'settleUpModal',
			})
			.then((modalEl) => {
				modalEl.present();
			});
	}
}
