import { DatePipe, formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { map, tap } from 'rxjs/operators';
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

  insertEntry(entry:FBEntry,  game: FBGame, route:FBRoute){
    //convert date and add route
    entry.date = String(entry.date == "" ? "" : this.myDatePipe.transform(entry.date, 'yyyy-MM-dd'));
    entry.route = game.name + '/' + route.name;
    
    //math
    this.addEntry( route, entry)
    this.addEntry( game, entry)

    //TODO: synchroznize 3 callls
    this.entryList.push(_.omit(entry, ["$key"]))
    this.routeService.updateRoute(route);
    this.gameService.updateGame(game);
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

  updateEntry(newEntry:FBEntry, oldEntry: FBEntry, game: FBGame, route:FBRoute){
    //format date and add route for push
    newEntry.date = String(newEntry.date == "" ? "" : this.myDatePipe.transform(newEntry.date, 'yyyy-MM-dd'));
    //math
    this.subEntry( route, oldEntry)
    this.addEntry( route, newEntry)
    this.subEntry( game, oldEntry)
    this.addEntry( game, newEntry)

    //TODO: synchroznize 3 callls
    this.entryList.update(newEntry.$key, _.omit(newEntry, ["$key", "route"]))
    this.routeService.updateRoute(route);
    this.gameService.updateGame(game);
  }
  deleteEntry(entry:FBEntry,  game: FBGame, route:FBRoute) {
    //math
    this.subEntry( route, entry)
    this.subEntry( game, entry)

    //TODO: synchroznize 3 callls
    this.entryList.remove(entry.$key);
    this.routeService.updateRoute(route);
    this.gameService.updateGame(game);
  }

  loadAllEntryDataBase(userKey: string){
    this.entryList = this.firebase.list('data/' + userKey +'/entries');
  }
  loadFilteredEntryDataBase(userKey: string, routeName: string){
    this.entryList = this.firebase.list('data/' + userKey +'/entries', ref => ref.orderByChild('route').equalTo(routeName));
  }
}
