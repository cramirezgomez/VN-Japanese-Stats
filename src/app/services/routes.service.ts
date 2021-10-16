import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { FBGame, Game } from '../models/game.model';

import { FBRoute, Route } from '../models/route.model';
import { AuthService } from './auth.service';
import { GamesService } from './games.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  
  
  routeList!: AngularFireList<Route>;
  routeArray:any[] = [];
  public curRoute: FBRoute = new FBRoute;
  
  

  constructor(private firebase: AngularFireDatabase, 
    private gameService:GamesService, private authSer: AuthService) { 
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

  //set route after clicked
  setRoute(input:FBRoute){
    this.curRoute = input;
    //this.loadEntries();
  }

  getRoutes(gameName:string){
    this.routeList.snapshotChanges().subscribe(
      list => {
        this.routeArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });

        //
        this.routeArray = this.routeArray.filter(item => {
          if(item.game == gameName){
            return true;
          }
          else{ 
            return false;
          }
        });

        //update route stats
        // let emptyGame = new FBGame();
        // emptyGame.name = this.gameService.curGame.name;
        // emptyGame.link = this.gameService.curGame.link;
        // emptyGame.$key = this.gameService.curGame.$key;
        // this.gameService.curGame = this.routeArray.reduce((acc, cur) => {
        //   acc.chars += (cur.chars || 0);
        //   acc.lines += (cur.lines || 0);
        //   acc.mins += (cur.mins || 0);
        //   acc.days += (cur.days || 0);
        //   return acc;
        // }, emptyGame);

      });
  }
  insertRoute(route:FBRoute, game:FBGame){
    route.game = game.name;
    this.routeList.push(_.omit(route, ["$key"]));
  }

  updateRoute(){
    //aggregation method
    return this.routeList.update(this.curRoute.$key, _.omit(this.curRoute, ["$key","name","game", "link"]))
  }

  deleteRoute($key: string, game:FBGame) {
    let q = this.routeList.remove($key)
    q.then(() => {
      this.gameService.updateGame(game)
    });

    //this.routeList.remove($key).then( res => this.gameService.updateGame());
  }
  populateForm(row: any){
    this.routeForm.setValue(_.omit(row, "game"));
  }

  updateRouteManually(route: FBRoute, game: FBGame) {
    this.routeList.update(route.$key, _.omit(route, ["$key"])).then( res => this.gameService.updateGame(game));
  }

  loadRoutesDatabase(userKey: string){
    this.routeList = this.firebase.list('data/' + userKey +'/routes');
  }
  
}
