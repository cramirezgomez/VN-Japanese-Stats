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
  data: VnDatabaseService;
  curGame: string;
  curRoute: string;


  

  constructor(vndb: AngularFireDatabase, data: VnDatabaseService) { 
    this.vndb = vndb 
    this.data = data;
    this.curGame = this.data.getGame();
    this.curRoute = this.data.getRoute();
  }

  ngOnInit(): void {
    if(this.data.getGame() == ""){
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
