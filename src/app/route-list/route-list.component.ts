import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
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

  curGame: any;
  routes: any = [];
  vndb: any;

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
        this.routes = routeList;
     })
    }
  }

  routeClicked (pos:number){
    this.vndbService.setRoute(this.routes[pos].name);
    console.log(this.vndbService.getRoute());
  }

}


