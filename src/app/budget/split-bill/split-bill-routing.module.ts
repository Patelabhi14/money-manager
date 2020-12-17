import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitBillPage } from './split-bill.page';

const routes: Routes = [
  {
    path: '',
    component: SplitBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitBillPageRoutingModule {}
