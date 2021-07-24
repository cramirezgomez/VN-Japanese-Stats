import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Route } from '../models/route.model';
import { VnDatabaseService } from '../vn-database.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {

  curGame: string;
  routes: Route[] = [];
  vndb: AngularFireDatabase;

  vndbService: VnDatabaseService;

  

  constructor(vndb: AngularFireDatabase, vndbService: VnDatabaseService) { 
    this.vndb = vndb 
    this.vndbService = vndbService;
    this.curGame = this.vndbService.getGame();
  }

  ngOnInit(): void {
    //access db
    if(this.vndbService.getGame() == ""){
      this.routes = [];
    }
    else{
     
      this.vndb.list('/routes', (ref:any) => ref.orderByChild("game").equalTo(this.curGame)).valueChanges().subscribe((routeList: any) => {
        // this.routes = routeList;
        this.routes = routeList.map((e:Route) => {
          return {
            chars: e.chars,
            days:  e.days,
            game: e.game,
            lines: e.lines,
            link:  e.link,
            mins:  e.mins,
            name:  e.name
          } as Route;
        })
     })
    }
  }

  routeClicked (pos:number){
    this.vndbService.setRoute(this.routes[pos].name);
    console.log(this.vndbService.getRoute());
  }

}


