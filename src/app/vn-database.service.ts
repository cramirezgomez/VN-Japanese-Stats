import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VnDatabaseService {

  constructor() {
  }

  curGame: number = -1;
  
  //set game after clicked
  setGame(pos:number){
    this.curGame = pos;
  }

  getGame(){
    return this.curGame;
  }
}
