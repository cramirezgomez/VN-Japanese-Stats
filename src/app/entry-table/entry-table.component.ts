import { Component, OnInit } from '@angular/core';
import { GamesService } from '../shared/games.service';




@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss']
})

export class EntryTableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'chars', 'lines', 'mins', 'pace'];
  Math: any;

  constructor(public gameService: GamesService) { 

    this.Math = Math;
  }

  ngOnInit(): void {
  
  }

}
