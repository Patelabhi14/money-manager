import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'budget',
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./budget/budget.module').then((m) => m.BudgetPageModule),
			},
			{
				path: 'new',
				loadChildren: () =>
					import('./budget/new-budget/new-budget.module').then(
						(m) => m.NewBudgetPageModule
					),
			},
			{
				path: 'analysis',
				loadChildren: () =>
					import('./budget/analysis/analysis.module').then(
						(m) => m.AnalysisPageModule
					),
			},
			{
				path: 'splitbill',
				loadChildren: () =>
					import('.//budget/split-bill/split-bill.module').then(
						(m) => m.SplitBillPageModule
					),
			},
			{
				path: ':date',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('./budget/budget-detail/budget-detail.module').then(
								(m) => m.BudgetDetailPageModule
							),
					},
					{
						path: 'edit/:id',
						loadChildren: () =>
							import(
								'./budget/budget-detail/edit-budget/edit-budget.module'
							).then((m) => m.EditBudgetPageModule),
					},
				],
			},
		],
	},
	{
		path: '',
		redirectTo: 'budget',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
