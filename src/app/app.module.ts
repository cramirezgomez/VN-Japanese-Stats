import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameListComponent } from './game-list/game-list.component';
import { RouteListComponent } from './route-list/route-list.component';
import { EntryTableComponent } from './entry-table/entry-table.component';
import { AddEntryComponent } from './entry-table/add-entry/add-entry.component';
import { GamesService } from './shared/games.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGameComponent } from './game-list/add-game/add-game.component';
import { AddRouteComponent } from './route-list/add-route/add-route.component';
import { DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';





 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameListComponent,
    RouteListComponent,
    EntryTableComponent,
    AddEntryComponent,
    AddGameComponent,
    AddRouteComponent,
    ConfirmDialogComponent,

    
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
    AngularFireAuthModule,
    AngularFirestoreModule
    
   
    
  ],
  providers: [GamesService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[AddEntryComponent, AddRouteComponent, AddGameComponent, ConfirmDialogComponent]
})
export class AppModule { }


