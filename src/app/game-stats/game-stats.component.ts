import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.scss']
})
export class GameStatsComponent implements OnInit {
  name = "";
  routes: any = [];

  constructor(private myService: HttpService) { }

  ngOnInit(): void {
    let allData = this.myService.getGame()
    this.name = allData.name;
    this.routes = allData.routes;
  }

}
