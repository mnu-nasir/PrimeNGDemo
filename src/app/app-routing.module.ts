import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicGridComponent } from './dynamic-grid/dynamic-grid.component';
import { RowGroupGridComponent } from './row-group-grid/row-group-grid.component';

const routes: Routes = [
  { path: 'dynamic-grid', component: DynamicGridComponent },
  { path: 'row-group', component: RowGroupGridComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
