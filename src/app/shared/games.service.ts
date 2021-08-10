import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entry } from '../models/entry.model';
import { Game } from '../models/game.model';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  gameList: AngularFireList<Game>;
  gameArray:any[] = [];
  public curGame: string = "";

  routeList: AngularFireList<Route>;
  routeArray:any[] = [];
  public curRoute: string = "";

  entryList: AngularFireList<Entry>;
  entryArray: any[] = [];

  constructor(private firebase: AngularFireDatabase) { 
    this.gameList = this.firebase.list('games');
    this.routeList = this.firebase.list('routes');
    this.entryList = this.firebase.list('entries');
    this.loadGames();
  }

  //set route after clicked
  setRoute(input:string){
    this.curRoute = input;
    this.loadEntries();
  }

  //set game after clicked
  setGame(input:string){
    this.curGame = input;
    this.loadRoutes();
  }

  loadGames(){
    this.gameList.snapshotChanges().subscribe(
      list => {
        this.gameArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  loadRoutes(){
    this.routeList.snapshotChanges().subscribe(
      list => {
        this.routeArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.routeArray = this.routeArray.filter(item => {
          if(item.game == this.curGame){
            return true;
          }
          else{ 
            return false;
          }
        })

      });
  }

  loadEntries(){
    this.entryList.snapshotChanges().subscribe(
      list => {
        this.entryArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      
        this.entryArray = this.entryArray.filter(item => {
          if(item.route == this.curGame + '/' + this.curRoute){
            return true;
          }
          else{ 
            return false;
          }
        })

      });
  }

  loadAllEntries(){
    this.entryList.snapshotChanges().subscribe(
      list => {
        this.entryArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  initializeFormGroup() {
    this.entryForm.setValue({
      $key: null,
      chars: '',
      date: '',
      lines: '',
      mins: '',
    })
  }
  entryForm:FormGroup = new FormGroup({
    $key: new FormControl(null),
    chars: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    lines: new FormControl('', [Validators.required]),
    mins: new FormControl('', Validators.required)
  })


}
