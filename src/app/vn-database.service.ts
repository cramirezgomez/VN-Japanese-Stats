import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VnDatabaseService {

  constructor() {
  }

  curGame: string = "";
  curRoute: string = "";

  //set game after clicked
  setGame(input:string){
    this.curGame = input;
  }

  getGame(){
    return this.curGame;
  }

  //set game after clicked
  setRoute(input:string){
    this.curRoute = input;
  }

  getRoute(){
    return this.curRoute;
  }
}
