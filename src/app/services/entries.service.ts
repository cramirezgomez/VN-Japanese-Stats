import { DatePipe, formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { map, reduce, tap } from 'rxjs/operators';
import { Entry, FBEntry } from '../models/entry.model';
import { FBGame } from '../models/game.model';
import { FBRoute, Item } from '../models/route.model';
import { AuthService } from './auth.service';
import { GamesService } from './games.service';
import { RoutesService } from './routes.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  entryList!: AngularFireList<Entry>;

  
  
  constructor(private firebase: AngularFireDatabase, private myDatePipe: DatePipe, 
    private gameService:GamesService, private routeService:RoutesService, private authSer: AuthService) {}

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
  getEntries(){
    return this.entryList.snapshotChanges().pipe(
      map(entryList => entryList.map(item => { 
        return {
          $key: item.key,
          ...item.payload.val()
        } as FBEntry
      }))
    )
  }

  getEntriesByGame(gameName: string){
    return this.getEntries().pipe(
      map(entryList => entryList.filter(entry => {
        const gameAndRoute = entry.route.split("/");
        return gameAndRoute[0] == gameName
      }))
    )
  }
  

  getEntriesByRoute(gameName: string, routeName: string){
    return this.getEntries().pipe(
      map(entryList => entryList.filter(entry => entry.route == `${gameName}/${routeName}`))
    )
  }

  getEntryTotalByGame(gameName: string){
    
    return this.getEntriesByGame(gameName).pipe(
      map(entryList => {
        let total = new FBGame();
        return this.addUpEntries(entryList, total);
      })
    )
  }

  getEntryTotalByRoute(gameName: string, routeName: string){
    return this.getEntriesByRoute(gameName, routeName).pipe(
      map(entryList => {
        let total = new FBRoute();
        return this.addUpEntries(entryList, total);
      })
    )
  }

  private addUpEntries(entryList: FBEntry[], total:Item) {
    
    return entryList.reduce((acc, cur) => {
      acc.chars += (cur.chars || 0);
      acc.lines += (cur.lines || 0);
      acc.mins += (cur.mins || 0);
      acc.days++;
      return acc;
    }, total);
  }

  insertEntry(entry:FBEntry,  game: FBGame, route:FBRoute){

    //convert date and add route
    entry.date = String(entry.date == "" ? "" : this.myDatePipe.transform(entry.date, 'yyyy-MM-dd'));
    entry.route = game.name + '/' + route.name;

    route.days++;
    game.days++;

    //math
    this.addEntry( route, entry)
    this.addEntry( game, entry)

    //all 3 asynch calls
    this.entryList.push(_.omit(entry, ["$key"]))
    this.routeService.updateRoute(route);
    this.gameService.updateGame(game);
  }

  updateEntry(newEntry:FBEntry, oldEntry: FBEntry, game: FBGame, route:FBRoute){

    //format date and add route for push
    newEntry.date = String(newEntry.date == "" ? "" : this.myDatePipe.transform(newEntry.date, 'yyyy-MM-dd'));

    //math
    this.subEntry( route, oldEntry)
    this.addEntry( route, newEntry)
    this.subEntry( game, oldEntry)
    this.addEntry( game, newEntry)

    //all 3 asynch calls
    this.entryList.update(newEntry.$key, _.omit(newEntry, ["$key", "route"]))
    this.routeService.updateRoute(route);
    this.gameService.updateGame(game);
  }
  deleteEntry(entry:FBEntry,  game: FBGame, route:FBRoute) {
    //sub days
    route.days--;
    game.days--;
    
    //math
    this.subEntry( route, entry)
    this.subEntry( game, entry)

    //all 3 asynch calls
    this.entryList.remove(entry.$key);
    this.routeService.updateRoute(route);
    this.gameService.updateGame(game);
  }

  loadEntryDataBase(userKey: string){
    this.entryList = this.firebase.list('data/' + userKey +'/entries');
  }

  
  private addItem(item: Item,entry: Item){
    item.chars += entry.chars;
    item.lines += entry.lines;
    item.mins += entry.mins;
  }

  private addEntry(item: Item,entry: FBEntry){
    item.chars += entry.chars;
    item.lines += entry.lines;
    item.mins += entry.mins;
  }
  private subEntry(item: Item,entry: FBEntry){
    item.chars -= entry.chars;
    item.lines -= entry.lines;
    item.mins -= entry.mins;
  }
  private clearItem(item: Item){
    item.chars = 0;
    item.lines = 0;
    item.mins = 0;
  }
}
