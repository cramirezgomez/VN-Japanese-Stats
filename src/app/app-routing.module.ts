import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import new pages
// import { ListComponent } from './list/list.component';
import { LoginComponent } from './page-home/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './page-home/signup/signup.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageEntryComponent } from './page-entry/page-entry.component';
import { PageGameComponent } from './page-game/page-game.component';
import { PageRouteComponent } from './page-route/page-route.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';

const routes: Routes = [
  {path: '', component:PageHomeComponent},
  {path: 'home', component:PageHomeComponent},
  {path: 'vn_list', component:PageGameComponent, canActivate:[AuthGuard]},
  {path: 'vn_list/:gameName', component:PageRouteComponent, canActivate:[AuthGuard]},
  {path: 'vn_list/:gameName/:routeName', component:PageEntryComponent, canActivate:[AuthGuard]},
  // {path: 'route_list', component:PageRouteComponent, canActivate:[AuthGuard]},
  // {path: 'entries', component:PageEntryComponent, canActivate:[AuthGuard]},
  {path: 'settings', component:PageSettingsComponent, canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
