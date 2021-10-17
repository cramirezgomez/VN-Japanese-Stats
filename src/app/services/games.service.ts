import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FBGame, Game } from '../models/game.model';
import * as _ from 'lodash'
import { AuthService } from './auth.service';
import { tap, map } from 'rxjs/operators';
import { FBRoute } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  gameList!: AngularFireList<Game>;
  
  public allGames: FBGame = new FBGame;
  //public curGame: FBGame = new FBGame;
  

  // public totalGameEntries: Game = new Game();

  constructor(private firebase: AngularFireDatabase, private authSer: AuthService) { 
  }

  initializeGameFormGroup() {
    this.gameForm.setValue({
      $key: null,
      chars: 0,
      lines: 0,
      mins: 0,
      name: '',
      link: '',
      days: 0
    })
  }
  gameForm:FormGroup = new FormGroup({
    $key: new FormControl(null),
    chars: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    lines: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    days: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    mins: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  loadGamesDatabase(userKey: string){
    this.gameList = this.firebase.list('data/' + userKey +'/games');
  }

  getGames(){
    return this.gameList.snapshotChanges().pipe(
      map(gameList => gameList.map(item => { 
        return {
          $key: item.key,
          ...item.payload.val()
        } as FBGame
      }))
    );
  }

  getGame(userKey: string, gameName:string){
    let findGame: AngularFireList<Game> = this.firebase.list('data/' + userKey +'/games', ref => ref.orderByChild('name').equalTo(gameName));
    return findGame.snapshotChanges().pipe(
      map(gameList => gameList.map(item => { 
        
        return  {
          $key: item.key,
          ...item.payload.val()
        } as FBGame
      }))
    );
  }

  

  insertGame(game:FBGame){
    this.gameList.push(_.omit(game, ["$key"]));
  }

  updateGame(game: FBGame){
    return this.gameList.update(game.$key, _.omit(game, ["$key", "name", "link"]))
  }

  deleteGame($key: string) {
    this.gameList.remove($key);
  }
  populateForm(row: any){
    this.gameForm.setValue(row);
  }

  updateGameManually(game:FBGame){
    this.gameList.update(game.$key, _.omit(game, ["$key"]))
  }

  

}
