import { Component, OnInit } from '@angular/core';
import { GamesService } from '../shared/games.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {

  constructor(public gameService: GamesService) { 
  }

  ngOnInit(): void {
  }

  routeClicked (pos:number){
    this.gameService.setRoute(this.gameService.routeArray[pos]);
  }

}


