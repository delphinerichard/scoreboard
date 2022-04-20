import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewGameComponent } from './new-game/new-game.component';


const routes: Routes = [
  {
    path: 'play',
    component: DashboardComponent,
  },
  {
    path: 'newGame',
    component: NewGameComponent,
  },
  {
    path: '**',
    redirectTo: 'newGame'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
