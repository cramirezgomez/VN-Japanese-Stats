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

  name: any;
  routes: any;
  vndb: any;

  data: any;

  

  constructor(vndb: AngularFireDatabase, data: VnDatabaseService) { 
    this.vndb = vndb 
    this.data = data;
  }

  ngOnInit(): void {
    //access db
    if(this.data.getGame() == -1){
      this.name = "No";
      this.routes = [];
    }
    else{
      this.vndb.object('/' + this.data.getGame()).valueChanges().subscribe((vn: any) => {
        this.name = vn.name; 
        this.routes = vn.routes;
       })
    }
   
  }

  routeClicked (pos:number){
    this.data.setRoute(pos);
  }

}


