import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetPage } from './budget.page';

const routes: Routes = [
	{
		path: '',
		component: BudgetPage,
	},
  {
    path: 'analysis',
    loadChildren: () => import('./analysis/analysis.module').then( m => m.AnalysisPageModule)
  },
  {
    path: 'split-bill',
    loadChildren: () => import('./split-bill/split-bill.module').then( m => m.SplitBillPageModule)
  },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BudgetPageRoutingModule {}
