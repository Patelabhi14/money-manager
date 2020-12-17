import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitBillPageRoutingModule } from './split-bill-routing.module';

import { SplitBillPage } from './split-bill.page';
import { AddPeopleComponent } from '../../components/add-people/add-people.component';
import { SettleUpComponent } from '../../components/settle-up/settle-up.component';
import { PopOverComponent } from '../../components/pop-over/pop-over.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		IonicModule,
		SplitBillPageRoutingModule,
	],
	declarations: [
		SplitBillPage,
		AddPeopleComponent,
		SettleUpComponent,
		PopOverComponent,
	],
})
export class SplitBillPageModule {}
