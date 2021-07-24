import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Game } from '../models/game.model';
import { VnDatabaseService } from '../vn-database.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  
  vndb: AngularFireDatabase;
  vndbService: VnDatabaseService;

  games: Game[] = [];

  constructor(vndb: AngularFireDatabase, vndbService: VnDatabaseService) { 
    this.vndb = vndb 
    this.vndbService = vndbService;
  }

  ngOnInit(): void {
   //access db
   this.vndb.list('/games').valueChanges().subscribe((vnList:any) => {
      this.games = vnList.map((e:Game) => {
        return {
          chars: e.chars,
          days:  e.days,
          lines: e.lines,
          link:  e.link,
          mins:  e.mins,
          name:  e.name
        } as Game;
      })
   })

   
    
  }

  gameClicked (pos:number){
    this.vndbService.setGame(this.games[pos].name);
  }
}
function e(e: any, arg1: (Game: any) => Game): Game[] {
  throw new Error('Function not implemented.');
}

