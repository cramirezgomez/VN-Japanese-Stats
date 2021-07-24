import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Entry } from '../models/entry.model';
import { VnDatabaseService } from '../vn-database.service';




@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss']
})

export class EntryTableComponent implements OnInit {

  //name: any;
  displayedColumns: string[] = ['date', 'chars', 'lines', 'mins', 'pace'];
  entries: Entry[] = [];
  vndb: any;

  vndbService: VnDatabaseService;
  curGame: string;
  curRoute: string;
  Math: any;


  

  constructor(vndb: AngularFireDatabase, vndbService: VnDatabaseService) { 
    this.vndb = vndb 
    this.vndbService = vndbService;
    this.curGame = this.vndbService.getGame();
    this.curRoute = this.vndbService.getRoute();
    this.Math = Math;
  }

  ngOnInit(): void {
    if(this.curGame == ""){
      this.entries = [];
    }
    else{
     
      this.vndb.list('/entries', (ref:any) => ref.orderByChild("route").equalTo(this.curGame + '/' + this.curRoute)).valueChanges().subscribe((entryList: any) => {
        //this.entries = entryList;
        this.entries = entryList.map((e:Entry) => {
          return {
            chars: e.chars,
            date:  e.date,
            lines: e.lines,
            mins:  e.mins,
            route:  e.route
          } as Entry;
        })


        console.log(this.entries);
     })
    } 
  }

}
