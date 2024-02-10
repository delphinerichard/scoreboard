import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './skyjo/dashboard/dashboard.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { PaleoDashboardComponent } from './paleo/paleo-dashboard/paleo-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
  },
  {
    path: 'skyjo',
    component: DashboardComponent,
  },
  {
    path: 'paleo',
    component: PaleoDashboardComponent,
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
