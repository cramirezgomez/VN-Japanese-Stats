import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  games: any = [];


  constructor(private myService: HttpService) { }

  ngOnInit(): void {
    this.games = this.myService.getAllGames();
    console.log(this.games);
  }

  gameClicked (pos:number){
    this.myService.setGame(pos);
    console.log("clicked: " + this.games[pos])
  }

}
