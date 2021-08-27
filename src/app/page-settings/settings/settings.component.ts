import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { EntriesService } from '../../services/entries.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  
  clickCounter: number = 0;
  name: string = " ";
  allEntries: any[] = [];
  downloadJsonHref: any;
  myDate: Date = new Date();
  Math: any;
  constructor(public entryService: EntriesService, private sanitizer: DomSanitizer, public gameService: GamesService,
    public authSer: AuthService) {
    this.Math = Math;
   }

  ngOnInit(): void {
    //create backup
    this.entryService.getAllEntries().subscribe(
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
