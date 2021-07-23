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

  data: any;

  

  constructor(vndb: AngularFireDatabase, data: VnDatabaseService) { 
    this.vndb = vndb 
    this.data = data;
  }

  ngOnInit(): void {
    //access db
    if(this.data.getGame() == -1 || this.data.getRoute() == -1){
      this.name = "No";
      this.entries = [];
    }
    else{
      this.vndb.object('/' + this.data.getGame() + "/routes/" +  this.data.getRoute()).valueChanges().subscribe((vn: any) => {
        

        this.name = vn.name; 
        this.entries = vn.data;

        console.log(this.name);
        console.log(this.entries);
       })
    }
    
  }

}
