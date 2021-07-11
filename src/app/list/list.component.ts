import { Component, OnInit } from '@angular/core';
import { VnDatabaseService } from '../vn-database.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  games: any = [];


  constructor(private myService: VnDatabaseService) { }

  ngOnInit(): void {
    this.games = this.myService.getAllGameNames();
    console.log(this.games);
    
  }

  gameClicked (pos:number){
    this.myService.setGame(pos);
  }

}
