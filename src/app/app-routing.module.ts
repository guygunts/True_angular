import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListpackgetComponent } from './listpackget/listpackget.component';
import { PackgetmanagmentComponent } from './packgetmanagment/packgetmanagment.component';
import { UsermanagmentComponent } from './usermanagment/usermanagment.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'listpackget', component: ListpackgetComponent },
  { path: 'packgetmanagment', component: PackgetmanagmentComponent },
  { path: 'usermanagment', component: UsermanagmentComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
