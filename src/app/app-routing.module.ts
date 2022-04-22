import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentGameComponent } from './current-game/current-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewGameComponent } from './new-game/new-game.component';
import { ScoresComponent } from './scores/scores.component';


const routes: Routes = [
  {
    path: 'play2',
    component: CurrentGameComponent,
  },
  {
    path: 'play',
    component: DashboardComponent,
  },
  {
    path: 'newGame',
    component: NewGameComponent,
  },
  {
    path: 'scores',
    component: ScoresComponent,
  },
  {
    path: '**',
    redirectTo: 'play'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
