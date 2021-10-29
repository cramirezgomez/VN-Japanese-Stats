import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { FBEntry } from '../models/entry.model';
import { FBGame } from '../models/game.model';
import { AuthService } from '../services/auth.service';
import { DownloadService } from '../services/download.service';
import { EntriesService } from '../services/entries.service';
import { GamesService } from '../services/games.service';
import { ScreenService } from '../services/screen.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit, OnDestroy {
  
  entriesArray: FBEntry[] = [];
  
  totalStats = new FBGame();

  //Filter
  filteredEntriesArray: FBEntry[] = [];
  gameNames: string[] = [];
  routeNames: string[] = [];
  gameFilter = '';
  routeFilter = '';
  menuGames = new Map<string, string[]>();

  //SUbs
  authSub: Subscription | undefined;
  entrySub: Subscription | undefined;
  totalSub: Subscription | undefined;
  allGamesSub: Subscription | undefined;

  constructor(public entryService: EntriesService, public gameService: GamesService,
    public authSer: AuthService, public dlSer: DownloadService, public screen: ScreenService) {
   }
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.entrySub?.unsubscribe();
    this.totalSub?.unsubscribe();
    this.allGamesSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.authSub = this.authSer.afAuth.authState.subscribe(user => {
      var userKey = "";
      if (user) {
        userKey = user.uid;

        //load databases
        this.gameService.loadGamesDatabase(userKey);
        this.entryService.loadEntryDataBase(userKey)


        //get all entries
        this.entrySub = this.entryService.getEntries().subscribe( data =>{
          this.entriesArray = data;
          this.filteredEntriesArray = Object.assign([], data);
          this.createJsonUrl();

          this.menuGames.clear();
          //get routes and game Names
          _.uniqBy(data, 'route').map( unique => {
            let gameAndRoute = unique.route.split("/");
            let oldVal = this.menuGames.get(gameAndRoute[0]);
            if(oldVal == undefined){
              this.menuGames.set(gameAndRoute[0], [gameAndRoute[1]]);
            }
            else{
              oldVal.push(gameAndRoute[1])
            }
            
          });
          this.gameNames = Array.from( this.menuGames.keys() );
        })

        

        //get total
        this.totalSub = this.gameService.getTotalStats().subscribe( data =>{
          this.totalStats = data
        });

        //get all games for filter
        // this.allGamesSub = this.gameService.getGames().subscribe( data => {
        //   this.gameNames = data.map( game => game.name);
        // })
        
      }
    });
  }

  private createJsonUrl() {
    let initialValue = {};
    let urlArray = this.entriesArray.reduce(function (previousValue, currentValue) {
      let curObj = {
        [currentValue.$key!]: _.omit(currentValue, "$key")
      };
      return _.merge(previousValue, curObj);
    }, initialValue);
    this.dlSer.generateDownloadJsonUri(urlArray);
  }
  applyGameFilter(){
    this.filteredEntriesArray = this.entriesArray.filter(data => data.route.startsWith(this.gameFilter))
    
    //reset routes on all
    this.routeFilter = ''
    if(this.gameFilter == ''){
      
      this.routeNames = [];
    }
    else{
      let temp = this.menuGames.get(this.gameFilter)
      if(temp){
        this.routeNames = temp;
      }
    }

  }

  applyRouteFilter(){
    this.filteredEntriesArray = this.entriesArray.filter(data => data.route.startsWith(this.gameFilter) && data.route.endsWith(this.routeFilter))
  }
}
