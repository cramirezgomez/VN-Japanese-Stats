import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  games: any = [];
  // brews!: Object;


  constructor(private _http: HttpService) { }

  ngOnInit(): void {
    this._http.getGames().subscribe(data =>{
      this.games = data;
      //console.log(data);
    });
  }

}
