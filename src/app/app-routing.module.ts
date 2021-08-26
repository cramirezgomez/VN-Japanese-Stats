import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import new pages
import { HomeComponent } from './home/home.component';
// import { ListComponent } from './list/list.component';
import { GameListComponent } from './game-list/game-list.component';
import { RouteListComponent } from './route-list/route-list.component';
import { EntryTableComponent } from './entry-table/entry-table.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './users/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './users/signup/signup.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'game_list', component:GameListComponent, canActivate:[AuthGuard]},
  {path: 'route_list', component:RouteListComponent, canActivate:[AuthGuard]},
  {path: 'entry_table', component:EntryTableComponent, canActivate:[AuthGuard]},
  {path: 'settings', component:SettingsComponent, canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
