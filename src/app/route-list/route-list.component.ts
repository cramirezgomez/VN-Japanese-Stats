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

  data: any;

  

  constructor(vndb: AngularFireDatabase, data: VnDatabaseService) { 
    this.vndb = vndb 
    this.data = data;
    this.curGame = this.data.getGame();
  }

  ngOnInit(): void {
    //access db
    if(this.data.getGame() == ""){
      this.routes = [];
    }
    else{
     
      this.vndb.list('/routes', (ref:any) => ref.orderByChild("game").equalTo(this.curGame)).valueChanges().subscribe((routeList: any) => {
        this.routes = routeList;
     })
    }
  }

  routeClicked (pos:number){
    this.data.setRoute(this.routes[pos].name);
    console.log(this.data.getRoute());
  }

}


