import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { VnDatabaseService } from '../vn-database.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games: any = [];
  vndb: AngularFireDatabase;
  data: any;


  constructor(vndb: AngularFireDatabase, data: VnDatabaseService) { 
    this.vndb = vndb 
    this.data = data;
  }

  ngOnInit(): void {
   //access db
   this.vndb.list('/').valueChanges().subscribe(vnList => {
      this.games = vnList; 
      //console.log(this.games[0]);
   })
    
  }

  gameClicked (pos:number){
    this.data.setGame(pos);
  }

}
