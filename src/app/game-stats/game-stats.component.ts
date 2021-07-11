import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { VnDatabaseService } from '../vn-database.service';
//import { VnDatabaseService } from '../vn-database.service';


@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.scss']
})
export class GameStatsComponent implements OnInit {
  name: any;
  routes: any;
  vndb: any;

  data: any;

  constructor(vndb: AngularFireDatabase, data: VnDatabaseService) { 
    this.vndb = vndb 
    this.data = data;
  }

  ngOnInit(): void {
    //access db
    if(this.data.getGame() == -1){
      this.name = "No";
      this.routes = [];
    }
    else{
      this.vndb.object('/' + this.data.getGame()).valueChanges().subscribe((vn: any) => {
        this.name = vn.name; 
        this.routes = vn.routes;
       })
    }
   
  }
}
