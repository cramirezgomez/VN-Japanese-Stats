import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FBGame, Game } from '../models/game.model';
import * as _ from 'lodash'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  gameList!: AngularFireList<Game>;
  gameArray:any[] = [];
  public curGame: FBGame = new FBGame;
  public allGames: FBGame = new FBGame;

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

  //set game after clicked
  setGame(input:FBGame){
    this.curGame = input;
  }

  loadGames(userKey: string){
    this.gameList = this.firebase.list('data/' + userKey +'/games');

    //onsole.log("loading" + 'data/' + userKey +'/games')
    //this.setUserGames();
    this.gameList.snapshotChanges().subscribe(
      list => {
        this.gameArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });

        //update route stats
        let emptyGame = new Game();
        if(this.authSer.userName){
          emptyGame.name = this.authSer.userName;
        }
        emptyGame.link = "/assets/img/allGames.jpg"
        this.allGames = this.gameArray.reduce((acc, cur) => {
          acc.chars += (cur.chars || 0);
          acc.lines += (cur.lines || 0);
          acc.mins += (cur.mins || 0);
          acc.days += (cur.days || 0);
          return acc;
        }, emptyGame);
      });
  }

  

  insertGame(game:FBGame){
    this.gameList.push(_.omit(game, ["$key"]));
  }

  updateGame(){
    return this.gameList.update(this.curGame.$key, _.omit(this.curGame, ["$key", "name", "link"]))
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

  // setUserGames(){
  //   this.gameList = this.firebase.list('data/' + this.authSer.userKey +'/games');
  //   console.log("setting game firelist")
  //   console.log(this.authSer.userKey);
  // }

  

}
