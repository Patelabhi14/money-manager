import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetDetailPage } from './budget-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetDetailPage
  },
  {
    path: 'edit-budget',
    loadChildren: () => import('./edit-budget/edit-budget.module').then( m => m.EditBudgetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetDetailPageRoutingModule {}
