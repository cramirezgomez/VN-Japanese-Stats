import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import new pages
import { HomeComponent } from './home/home.component';
import { GameListComponent } from './game-list/game-list.component';
import { RouteListComponent } from './route-list/route-list.component';
import { EntryTableComponent } from './entry-table/entry-table.component';
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'game_list', component:GameListComponent, canActivate: [AuthGuard]},
  { path: 'route_list', component:RouteListComponent, canActivate: [AuthGuard]},
  { path: 'entry_table', component:EntryTableComponent, canActivate: [AuthGuard]},
  //{ path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
