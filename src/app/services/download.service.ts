import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { FBEntry } from '../models/entry.model';
import { EntriesService } from './entries.service';
import { GamesService } from './games.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  downloadJsonHref: any;
  myDate: Date = new Date();
  constructor(public entryService: EntriesService, private sanitizer: DomSanitizer, public gameService: GamesService) {
    
   }

  generateDownloadJsonUri(arr:any) {
    // let arrayCopy = JSON.parse(JSON.stringify(arr))
    // arrayCopy.map((entry: FBEntry) => {
    //   JsonObj
      
    // })
    
    //_.omit(arr, ["time", "pace"])
    // copyArr = arr.map((x: any) => {
    //   var obj = {};
    //   Object.defineProperty(obj, x.$key, _.omit(x, ['pace', 'time', 'key']));
      
    //   return obj;
      
    // })
    console.log(arr);

    

    var theJSON = JSON.stringify(arr, null, 2);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }
}
