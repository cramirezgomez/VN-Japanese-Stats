import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entry } from '../models/entry.model';
import { FBGame, Game } from '../models/game.model';
import { FBRoute, Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  setKey(name: any) {
    throw new Error('Method not implemented.');
  }
  gameList: AngularFireList<Game>;
  gameArray:any[] = [];
  public curGame: FBGame = new FBGame;

  routeList: AngularFireList<Route>;
  routeArray:any[] = [];
  public curRoute: FBRoute = new FBRoute;

  entryList: AngularFireList<Entry>;
  

  constructor(private firebase: AngularFireDatabase) { 
    this.gameList = this.firebase.list('games');
    this.routeList = this.firebase.list('routes');
    this.entryList = this.firebase.list('entries');
    this.loadGames();
  }

  //set route after clicked
  setRoute(input:FBRoute){
    this.curRoute = input;
    //this.loadEntries();
  }

  //set game after clicked
  setGame(input:FBGame){
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
          if(item.game == this.curGame.name){
            return true;
          }
          else{ 
            return false;
          }
        })

      });
  }

  getEntriesForRoute(){
    return this.entryList.snapshotChanges();
    // this.entryList.snapshotChanges().subscribe(
    //   list => {
    //     this.entryArray = list.map(item => {
    //       return {
    //         $key: item.key,
    //         ...item.payload.val()
    //       };
    //     });
      
    //     this.entryArray = this.entryArray.filter(item => {
    //       if(item.route == this.curGame.name + '/' + this.curRoute.name){
    //         return true;
    //       }
    //       else{ 
    //         return false;
    //       }
    //     })

    //   });
  }

  getAllEntries(){
    return this.entryList.snapshotChanges();
    
    // this.entryList.snapshotChanges().subscribe(
    //   list => {
    //     this.entryArray = list.map(item => {
    //       return {
    //         $key: item.key,
    //         ...item.payload.val()
    //       };
    //     });
    //   });
  }
  
  initializeEntryFormGroup() {
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
    chars: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    date: new FormControl('', Validators.required),
    lines: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    mins: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
  })

  initializeRouteFormGroup() {
    this.routeForm.setValue({
      $key: null,
      chars: '0',
      lines: '0',
      mins: '0',
      name: '',
      link: '',
      days: '0'
    })
  }
  routeForm:FormGroup = new FormGroup({
    $key: new FormControl(null),
    chars: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    lines: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    days: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    mins: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  initializeGameFormGroup() {
    this.gameForm.setValue({
      $key: null,
      chars: '0',
      lines: '0',
      mins: '0',
      name: '',
      link: '',
      days: '0'
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

  insertEntry(input:any){
    var theDate = new Date(Date.parse(input.date));
    var localDate = theDate.toLocaleString().split(" ");
    localDate[0] = localDate[0].replace(',', '');
    console.log(localDate[0]);

    //convert from info to entry format
    let entry = new Entry;
    entry.chars = Number(input.chars);
    entry.date = localDate[0];
    entry.lines = Number(input.lines);
    entry.mins =  Number(input.mins);
    entry.route = this.curGame.name + '/' + this.curRoute.name;
    
    //push entry
    this.entryList.push(entry);

    //update game info
    this.gameList.update(this.curGame.$key, {
      chars: this.curGame.chars + entry.chars,
      lines: this.curGame.lines + entry.lines,
      mins: this.curGame.mins + entry.mins,
      days: this.curGame.days + 1
    })

    //update route info
    this.routeList.update(this.curRoute.$key, {
      chars: this.curRoute.chars + entry.chars,
      lines: this.curRoute.lines + entry.lines,
      mins: this.curRoute.mins + entry.mins,
      days: this.curRoute.days + 1
    })
    
    
  }

  insertGame(input:any){
    //convert from info to route format
    let game = new Game;
    game.chars = Number(input.chars);
    game.lines = Number(input.lines);
    game.mins =  Number(input.mins);
    game.days =  Number(input.days);
    game.link = input.link;
    game.name = input.name;

    this.gameList.push(game);
  }

  insertRoute(input:any){
    //convert from info to route format
    let route = new Route;
    route.chars = Number(input.chars);
    route.lines = Number(input.lines);
    route.mins =  Number(input.mins);
    route.days =  Number(input.days);
    route.link = input.link;
    route.name = input.name;
    route.game = this.curGame.name;
    

    this.routeList.push(route);
  }


}
