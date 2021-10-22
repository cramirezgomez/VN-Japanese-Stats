import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FBEntry } from '../models/entry.model';
import { FBGame, Game } from '../models/game.model';
import { FBRoute, Item } from '../models/route.model';
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

  //Subs
  authSub: Subscription | undefined;
  gameSub: Subscription | undefined;
  routeSub: Subscription | undefined;
  entrySub: Subscription | undefined;

  
  

  constructor(public gameService: GamesService, public routeService: RoutesService, public entryService:EntriesService, 
    private dialog: MatDialog,  public screen: ScreenService, private actRoute: ActivatedRoute, private authSer: AuthService,  
    public router: Router)
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
            this.curGame.$key = data[0].$key;
            this.curGame.name = data[0].name;
            this.curGame.link = data[0].link;
            //console.log(this.curGame)
          }
          else{
            this.router.navigate(['vn_list']);
          }
          
        }) ;

        //get route for totals
        this.routeSub = this.routeService.getRoute(userKey,this.routeName).subscribe(data =>{
          if(data && data.length > 0){
            let result  = data.find(x => x.game == this.gameName);
            if(result){
              this.curRoute.$key = result.$key;
              this.curRoute.game = result.game
              this.curRoute.link = result.link;
              this.curRoute.name = result.name;
             // console.log(this.curRoute)
            }
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
        this.entryService.getEntryTotalByGame(this.gameName).subscribe(data => {
          this.assignTotalsStats(this.curGame, data);
         // console.log(this.curGame)
        })
        this.entryService.getEntryTotalByRoute(this.gameName, this.routeName).subscribe(data => {
          this.assignTotalsStats(this.curRoute, data);
         // console.log(this.curRoute)
        })
      }
    });
  }

  private assignTotalsStats(item: Item, totals: Item){
    item.chars = totals.chars;
    item.lines = totals.lines;
    item.mins = totals.mins;
    item.days = totals.days;
  }

  onCreate(){

    this.entryService.initializeEntryFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      game: this.curGame,
      route: this.curRoute
    }
    this.dialog.open(AddEntryComponent, dialogConfig);
  }

  

}
