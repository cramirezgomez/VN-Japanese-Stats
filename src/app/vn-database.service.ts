import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class VnDatabaseService {

  games: any[] = [];

  constructor(db: AngularFireDatabase) {
    db.list('/').valueChanges().subscribe(games => {
      this.games = games;
      console.log(this.games);
    })
  }

  curGame: number = -1;
  // curRoute: number = -1;

  getAllGameNames(){
    let allNames: String[]  = [];

    //get only names
    this.games.forEach((element: { name: String; }) => {
      allNames.push(element.name)
    });

    return allNames;
  }

  //get info for game
  getGame(){
    //return empty game
    if (this.curGame == -1){
      return {
        "name":"Empty",
        "routes":[
        ]
      }
    }

    return this.games[this.curGame];
  }

  

  //set game after clicked
  setGame(pos:number){
    this.curGame = pos;
  }

  setGames(){

  }
}
