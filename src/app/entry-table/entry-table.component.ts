import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { VnDatabaseService } from '../vn-database.service';




@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss']
})

export class EntryTableComponent implements OnInit {

  name: any;
  entries: any;
  vndb: any;

  vndbService: VnDatabaseService;
  curGame: string;
  curRoute: string;


  

  constructor(vndb: AngularFireDatabase, vndbService: VnDatabaseService) { 
    this.vndb = vndb 
    this.vndbService = vndbService;
    this.curGame = this.vndbService.getGame();
    this.curRoute = this.vndbService.getRoute();
  }

  ngOnInit(): void {
    if(this.curGame == ""){
      this.entries = [];
    }
    else{
     
      this.vndb.list('/entries', (ref:any) => ref.orderByChild("route").equalTo(this.curGame + '/' + this.curRoute)).valueChanges().subscribe((entryList: any) => {
        this.entries = entryList;
        console.log(this.curGame + '/' + this.curRoute)
        console.log(this.entries);
     })
    } 
  }

}
