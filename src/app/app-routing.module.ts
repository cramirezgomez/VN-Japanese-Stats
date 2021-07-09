import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import new pages
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { GameStatsComponent } from './game-stats/game-stats.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'list', component:ListComponent},
  {path: 'game', component:GameStatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
