import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FBEntry } from '../models/entry.model';
import { FBGame, Game } from '../models/game.model';
import { FBRoute } from '../models/route.model';
import { AuthService } from '../services/auth.service';
import { EntriesService } from '../services/entries.service';
import { GamesService } from '../services/games.service';
import { RoutesService } from '../services/routes.service';
import { ScreenService } from '../services/screen.service';
import { AddEntryComponent } from './add-entry/add-entry.component';



@Component({
  selector: 'app-page-entry',
  templateUrl: './page-entry.component.html',
  styleUrls: ['./page-entry.component.scss']
})
export class PageEntryComponent implements OnInit, OnDestroy {
  entriesArray: FBEntry[] = [];
  curGame: FBGame = new FBGame();
  curRoute: FBRoute = new FBRoute();

  //names from addres
  gameName = '';
  routeName = '';

  //total enteis
  gameTotal: FBEntry = new FBEntry();
  routeTotal:FBEntry = new FBEntry();

  //Subs
  authSub: Subscription | undefined;
  gameSub: Subscription | undefined;
  routeSub: Subscription | undefined;
  entrySub: Subscription | undefined;

  
  

  constructor(public gameService: GamesService, public routeService: RoutesService, public entryService:EntriesService, 
    private dialog: MatDialog,  public screen: ScreenService, private actRoute: ActivatedRoute, private authSer: AuthService,  public router: Router)
  {
    this.gameName = this.actRoute.snapshot.params['gameName'];
    this.routeName = this.actRoute.snapshot.params['routeName']
  }
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.gameSub?.unsubscribe();
    this.routeSub?.unsubscribe();
    this.entrySub?.unsubscribe();
  }

  ngOnInit(): void {

    this.authSub = this.authSer.afAuth.authState.subscribe(user => {
      var userKey = "";
      if (user) {
        userKey = user.uid;

        //load databases
        this.gameService.loadGamesDatabase(userKey)
        this.routeService.loadRoutesDatabase(userKey, this.gameName);
        this.entryService.loadEntryDataBase(userKey)
        

        //get game for totals
        this.gameSub = this.gameService.getGame(userKey,this.gameName).subscribe(data =>{
          if(data && data.length > 0){
            this.curGame = data[0];
          }
          
        }) ;

        //get route for totals
        this.routeSub = this.routeService.getRoute(userKey,this.routeName).subscribe(data =>{
          if(data && data.length > 0){
            this.curRoute = data[0];
          }
          else{
            this.router.navigate(['vn_list']);
          }
        }) ;

        //get all entries
        this.entrySub = this.entryService.getEntriesByRoute(this.gameName, this.routeName).subscribe( data =>{
          this.entriesArray = data;
        })

        //get totals for edits
        this.entryService.getEntryTotalByGame(this.gameName).subscribe(data => this.gameTotal = data)
        this.entryService.getEntryTotalByRoute(this.gameName, this.routeName).subscribe(data => this.routeTotal = data)
      }
    });
  }

  onCreate(){

    this.entryService.initializeEntryFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      game: this.curGame,
      route: this.curRoute,
      gameTotal: this.gameTotal,
      routeTotal: this.routeTotal
    }
    this.dialog.open(AddEntryComponent, dialogConfig);
  }

  

}
