import { DatePipe } from '@angular/common';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entry, FBEntry } from '../models/entry.model';
import { FBGame, Game } from '../models/game.model';
import { FBRoute, Route } from '../models/route.model';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  deleteEntry($key: string) {
    throw new Error('Method not implemented.');
  }
  
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
  public curEntry: FBEntry = new FBEntry;

  constructor(private firebase: AngularFireDatabase, private myDatePipe: DatePipe) { 
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
  }

  getAllEntries(){
    return this.entryList.snapshotChanges();
  }
  
  initializeEntryFormGroup() {
    this.entryForm.setValue({
      $key: null,
      chars: 0,
      date: '',
      lines: 0,
      mins: 0,
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
      chars: 0,
      lines: 0,
      mins: 0,
      name: '',
      link: '',
      days: 0
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

  insertEntry(entry:FBEntry){
    //convert date and add route
    entry.date = String(entry.date == "" ? "" : this.myDatePipe.transform(entry.date, 'yyyy-MM-dd'));
    entry.route = this.curGame.name + '/' + this.curRoute.name;
    
    //push entry
    console.log(this.curGame)
    console.log(this.curRoute)
    console.log(entry)
    this.entryList.push(_.omit(entry, ["$key"]));

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
  updateEntry(entry:any){

    let charChange = Number(entry.chars) -  Number(this.curEntry.chars);
    let lineChange = Number(entry.lines) -  Number(this.curEntry.lines);
    let minChange = Number(entry.mins) -  Number(this.curEntry.mins);

    this.entryList.update(entry.$key,{
      chars: Number(entry.chars),
      date: String(entry.date == "" ? "" : this.myDatePipe.transform(entry.date, 'yyyy-MM-dd')),
      lines: Number(entry.lines),
      mins:  Number(entry.mins),
      route: this.curGame.name + '/' + this.curRoute.name,
    })

    //update game info
    this.gameList.update(this.curGame.$key, {
      chars: this.curGame.chars + charChange,
      lines: this.curGame.lines + lineChange,
      mins: this.curGame.mins + minChange,
    })

    //update route info
    this.routeList.update(this.curRoute.$key, {
      chars: this.curRoute.chars + charChange,
      lines: this.curRoute.lines + lineChange,
      mins: this.curRoute.mins + minChange
    })
    
  }

  insertGame(game:any){
    this.gameList.push(game);
  }

  insertRoute(route:any){
    this.routeList.push(route);
  }
  populateForm(row: any) {
    this.entryForm.setValue(_.omit(row, ["pace", "time", "route"]));
  }

}
