import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import new pages
// import { ListComponent } from './list/list.component';
import { GameListComponent } from './page-game/game-list/game-list.component';
import { RouteListComponent } from './page-route/route-list/route-list.component';
import { EntryTableComponent } from './page-entry/entry-table/entry-table.component';
import { SettingsComponent } from './page-settings/settings/settings.component';
import { LoginComponent } from './page-home/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './page-home/signup/signup.component';
import { PageHomeComponent } from './page-home/page-home.component';

const routes: Routes = [
  {path: '', component:PageHomeComponent},
  {path: 'home', component:PageHomeComponent},
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
