import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { map, tap } from 'rxjs/operators';
import { FBGame, Game } from '../models/game.model';

import { FBRoute, Route } from '../models/route.model';
import { AuthService } from './auth.service';
import { GamesService } from './games.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  
  
  routeList!: AngularFireList<Route>;
  
  
  

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



  getRoutes(gameName:string){
    return this.routeList.snapshotChanges().pipe(
      map(gameList => gameList.map(item => { 
        return {
          $key: item.key,
          ...item.payload.val()
        } as FBRoute
      }))
    )
  }

  getRoute(userKey: string, routeName:string){
    let findRoute: AngularFireList<Route> = this.firebase.list(`data/${userKey}/routes`, 
                                                                ref => ref.orderByChild('name').equalTo(routeName));
    return findRoute.snapshotChanges().pipe(
      map(routeList => routeList.map(item => { 
        
        return  {
          $key: item.key,
          ...item.payload.val()
        } as FBRoute
      }))
    );
  }

  insertRoute(route:FBRoute, game:FBGame){
    route.game = game.name;
    this.routeList.push(_.omit(route, ["$key"]));
  }

  updateRoute(curRoute: FBRoute){
    //aggregation method
    return this.routeList.update(curRoute.$key, _.omit(curRoute, ["$key","name","game", "link"]))
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

  loadRoutesDatabase(userKey: string, gameName: string){
    this.routeList = this.firebase.list('data/' + userKey +'/routes', ref => ref.orderByChild('game').equalTo(gameName));
  }
  
}
