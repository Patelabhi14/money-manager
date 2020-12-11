import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetPageRoutingModule } from './budget-routing.module';

import { BudgetPage } from './budget.page';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BudgetPageRoutingModule,
		NgCalendarModule,
	],
	declarations: [BudgetPage],
})
export class BudgetPageModule {}
