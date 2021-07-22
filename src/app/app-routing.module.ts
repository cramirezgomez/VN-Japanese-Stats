import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import new pages
import { HomeComponent } from './home/home.component';
// import { ListComponent } from './list/list.component';
import { GameListComponent } from './game-list/game-list.component';
import { RouteListComponent } from './route-list/route-list.component';
import { EntryTableComponent } from './entry-table/entry-table.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'game_list', component:GameListComponent},
  {path: 'route_list', component:RouteListComponent},
  {path: 'entry_table', component:EntryTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
