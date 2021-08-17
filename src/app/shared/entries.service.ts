import { DatePipe, formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Entry, FBEntry } from '../models/entry.model';
import { GamesService } from './games.service';
import { RoutesService } from './routes.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  entryList: AngularFireList<Entry>;

  
  
  constructor(private firebase: AngularFireDatabase, private myDatePipe: DatePipe, 
    private gameService:GamesService, private routeService:RoutesService) { 
    this.entryList = this.firebase.list('entries');
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
    this.entryForm.setValue({
      $key: null,
      chars: 0,
      date: '',
      lines: 0,
      mins: 0,
    })
  }

  populateForm(row: any) {
    console.log(_.omit(row, ["pace", "time", "route"]));
    this.entryForm.setValue(_.omit(row, ["pace", "time", "route"]));
  }

  //Read from entries
  getEntriesForRoute(){
    return this.entryList.snapshotChanges();
  }
  getAllEntries(){
    return this.entryList.snapshotChanges();
  }

  async insertEntry(entry:FBEntry){
    //convert date and add route
    entry.date = String(entry.date == "" ? "" : this.myDatePipe.transform(entry.date, 'yyyy-MM-dd'));
    entry.route = this.gameService.curGame.name + '/' + this.routeService.curRoute.name;
    
    //push entry
    this.entryList.push(_.omit(entry, ["$key"])).then(res => this.routeService.updateRoute().then( res => this.gameService.updateGame()));;

    
    
    
  }
  updateEntry(entry:FBEntry){


    //format date and add route for push
    entry.date = String(entry.date == "" ? "" : this.myDatePipe.transform(entry.date, 'yyyy-MM-dd'));
    entry.route =  this.gameService.curGame.name + '/' + this.routeService.curRoute.name;
    this.entryList.update(entry.$key, _.omit(entry, ["$key"])).then(res => this.routeService.updateRoute().then( res => this.gameService.updateGame()));

    //update route info
    

    //update game info
    
    this.gameService.updateGame(); 
  }
  deleteEntry($key: string) {
    this.entryList.remove($key).then(res => this.routeService.updateRoute().then( res => this.gameService.updateGame()));;
  }

  downloadBackup(allEntries:any){

  }
}
