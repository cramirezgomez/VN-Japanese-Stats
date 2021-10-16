import { DatePipe, formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Entry, FBEntry } from '../models/entry.model';
import { FBGame } from '../models/game.model';
import { FBRoute } from '../models/route.model';
import { AuthService } from './auth.service';
import { GamesService } from './games.service';
import { RoutesService } from './routes.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  entryList!: AngularFireList<Entry>;

  
  
  constructor(private firebase: AngularFireDatabase, private myDatePipe: DatePipe, 
    private gameService:GamesService, private routeService:RoutesService, private authSer: AuthService) { 
    //
    // authSer.afAuth.authState.subscribe(user => {
    //   var userKey = "";
    //   if (user) {
    //     userKey = user.uid;
    //     console.log("id:" + userKey);
    //     this.entryList = this.firebase.list('data/' + userKey +'/entries');
    //   }
    // });
  }

  //Form definition
  entryForm:FormGroup = new FormGroup({
    $key: new FormControl(null),
    chars: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
    date: new FormControl('', Validators.required),
    lines: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    mins: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.required]),
  })

  //Initilize form
  initializeEntryFormGroup() {
    let today = new Date((new Date().getTime()));
    this.entryForm.setValue({
      $key: null,
      chars: '',
      date: today,
      lines: '',
      mins: '',
    })
  }

  populateForm(row: any) {
    row = _.omit(row, ["pace", "time", "route", "game", "heroine"])
    row.date = new Date(row.date + " 00:00");
    this.entryForm.setValue(row);
  }

  //Read from entries
  getEntriesForRoute(){
    return this.entryList.snapshotChanges();
  }
  getAllEntries(){
    return this.entryList.snapshotChanges();
  }

  insertEntry(entry:FBEntry,  game: FBGame, route:FBRoute){
    //convert date and add route
    entry.date = String(entry.date == "" ? "" : this.myDatePipe.transform(entry.date, 'yyyy-MM-dd'));
    entry.route = game.name + '/' + this.routeService.curRoute.name;
    
    //push entry
    this.entryList.push(_.omit(entry, ["$key"])).then(res => this.routeService.updateRoute().then( res => this.gameService.updateGame(game)));;

    
    
    
  }
  updateEntry(entry:FBEntry, game: FBGame, route:FBRoute){


    //format date and add route for push
    entry.date = String(entry.date == "" ? "" : this.myDatePipe.transform(entry.date, 'yyyy-MM-dd'));
    //entry.route =  this.gameService.curGame.name + '/' + this.routeService.curRoute.name;
    this.entryList.update(entry.$key, _.omit(entry, ["$key", "route"])).then(res => this.routeService.updateRoute().then( res => this.gameService.updateGame(game)));

    //update route info
    

    //update game info
    
    this.gameService.updateGame(game); 
  }
  deleteEntry($key: string,  game: FBGame, route:FBRoute) {
    let p = this.entryList.remove($key);

    p.then(() => {
       let q = this.routeService.updateRoute();
      q.then(() => {
        this.gameService.updateGame(game)
      });
    });
    //this.entryList.remove($key).then(res => .then( res => this.gameService.updateGame()));
  }

  // insertManual(entries:Entry[]){
    
  //   entries.forEach(element => {
  //     this.entryList.push(element).then(res => this.routeService.updateRoute().then( res => this.gameService.updateGame()));;
  //   });
    
  //   //push entry
     
  // }

  async getAllEntriesFL(userKey: string){
    this.entryList = this.firebase.list('data/' + userKey +'/entries');
  }
}
