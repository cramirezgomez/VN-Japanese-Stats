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
  allGames = new FBGame();

  //SUbs
  authSub: Subscription | undefined;
  entrySub: Subscription | undefined;
  totalSub: Subscription | undefined;

  constructor(public entryService: EntriesService, public gameService: GamesService,
    public authSer: AuthService, public dlSer: DownloadService, public screen: ScreenService) {
   }
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.entrySub?.unsubscribe();
    this.totalSub?.unsubscribe();
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
          this.createJsonUrl();
        })

        //get total
        //get total
        this.totalSub =  this.gameService.getTotalStats().subscribe( data =>{
          this.allGames = data
        });
        
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
}
