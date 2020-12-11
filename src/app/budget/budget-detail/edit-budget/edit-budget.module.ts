import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBudgetPageRoutingModule } from './edit-budget-routing.module';

import { EditBudgetPage } from './edit-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBudgetPageRoutingModule
  ],
  declarations: [EditBudgetPage]
})
export class EditBudgetPageModule {}
