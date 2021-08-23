import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DomSanitizer } from '@angular/platform-browser';
import { Entry, FBEntry } from '../models/entry.model';
import { EntriesService } from '../shared/entries.service';
import { GamesService } from '../shared/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  clickCounter: number = 0;
  name: string = " ";
  allEntries: any[] = [];
  downloadJsonHref: any;
  myDate: Date = new Date();
  Math: any;
  constructor(public entryService: EntriesService, private sanitizer: DomSanitizer, public gameService: GamesService) {
    this.Math = Math;
   }

  ngOnInit(): void {
    //create backup
    this.entryService.getEntriesForRoute().subscribe(
      list => {
        //map to array
        this.allEntries = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()

          };
        });
        this.generateDownloadJsonUri();
      }
      
    )
  }

  generateDownloadJsonUri() {
    
    var theJSON = JSON.stringify(this.allEntries);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
}

  countClick(){
    this.clickCounter += 1;
  }

  setClasses(){
    let myClasses = {
      active: this.clickCounter > 4,
      notactive: this.clickCounter <= 4.
    }

    return myClasses
  }

}
