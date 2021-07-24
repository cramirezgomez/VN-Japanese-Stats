import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { VnDatabaseService } from '../vn-database.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  
  vndb: AngularFireDatabase;
  vndbService: VnDatabaseService;

  games: any = [];

  constructor(vndb: AngularFireDatabase, vndbService: VnDatabaseService) { 
    this.vndb = vndb 
    this.vndbService = vndbService;
  }

  ngOnInit(): void {
   //access db
   this.vndb.list('/games').valueChanges().subscribe(vnList => {
      this.games = vnList; 
   })

   
    
  }

  gameClicked (pos:number){
    this.vndbService.setGame(this.games[pos].name);
  }
}
