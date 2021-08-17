import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Game } from '../models/game.model';

import { FBRoute, Route } from '../models/route.model';
import { GamesService } from './games.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  
  
  routeList: AngularFireList<Route>;
  routeArray:any[] = [];
  public curRoute: FBRoute = new FBRoute;
  
  public totalRouteEntries: Route = new Route();

  constructor(private firebase: AngularFireDatabase, 
    private gameService:GamesService) { 
      this.routeList = this.firebase.list('routes');
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
          if(item.game == this.gameService.curGame.name){
            return true;
          }
          else{ 
            return false;
          }
        });

        //update route stats
        let emptyGame = new Game();
        this.gameService.totalGameEntries = this.routeArray.reduce((acc, cur) => {
          acc.chars += (cur.chars || 0);
          acc.lines += (cur.lines || 0);
          acc.mins += (cur.mins || 0);
          acc.days += (cur.days || 0);
          return acc;
        }, emptyGame);

      });
  }
  insertRoute(route:FBRoute){
    route.game = this.gameService.curGame.name;
    this.routeList.push(_.omit(route, ["$key"]));
  }

  updateRoute(){
    //aggregation method
    return this.routeList.update(this.curRoute.$key, _.omit(this.totalRouteEntries, ["name","game", "link"]))
  }

  deleteRoute($key: string) {
    this.routeList.remove($key).then( res => this.gameService.updateGame());
  }
  populateForm(row: any){
    console.log(row);
    this.routeForm.setValue(_.omit(row, "game"));
  }

  updateRouteManually(route: FBRoute) {
    this.routeList.update(route.$key, _.omit(route, ["$key"])).then( res => this.gameService.updateGame());
  }
  
}
