import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryTableComponent } from './page-entry/entry-table/entry-table.component';
import { AddEntryComponent } from './page-entry/add-entry/add-entry.component';
import { GamesService } from './services/games.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGameComponent } from './page-game/add-game/add-game.component';
import { AddRouteComponent } from './page-route/add-route/add-route.component';
import { DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from './page-home/confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './page-home/login/login.component';
import { SignupComponent } from './page-home/signup/signup.component';
import { PageEntryComponent } from './page-entry/page-entry.component';
import { PageGameComponent } from './page-game/page-game.component';
import { PageRouteComponent } from './page-route/page-route.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidenavCardComponent } from './shared/sidenav-card/sidenav-card.component';
import { TimePipe } from './shared/pipes/time.pipe';
import { PacePipe } from './shared/pipes/pace.pipe';
import { SeparateRoutePipe } from './shared/pipes/separate-route.pipe';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { ItemListComponent } from './shared/item-list/item-list.component';
import { LineGraphComponent } from './shared/line-graph/line-graph.component';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';




 
@NgModule({
  declarations: [
    AppComponent,
    EntryTableComponent,
    AddEntryComponent,
    AddGameComponent,
    AddRouteComponent,
    ConfirmDialogComponent,
    LoginComponent,
    SignupComponent,
    PageEntryComponent,
    PageGameComponent,
    PageRouteComponent,
    PageSettingsComponent,
    PageHomeComponent,
    NavbarComponent,
    SidenavCardComponent,
    TimePipe,
    PacePipe,
    SeparateRoutePipe,
    SidenavComponent,
    ItemListComponent,
    LineGraphComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MatNativeDateModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FlexLayoutModule,
   // NgxEchartsModule
   NgxEchartsModule.forRoot({
    /**
     * This will import all modules from echarts.
     * If you only need custom modules,
     * please refer to [Custom Build] section.
     */
    echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
  }),
    
   
    
  ],
  providers: [GamesService, DatePipe, TimePipe, PacePipe, SeparateRoutePipe],
  bootstrap: [AppComponent],
  entryComponents:[AddEntryComponent, AddRouteComponent, AddGameComponent, ConfirmDialogComponent]
})
export class AppModule { }


