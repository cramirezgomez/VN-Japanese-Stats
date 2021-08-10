import { Component, OnInit } from '@angular/core';
import { GamesService } from '../shared/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  constructor(public gameService: GamesService) {}

  ngOnInit(): void {}

  gameClicked (pos:number){
    this.gameService.setGame(this.gameService.gameArray[pos].name);
  }
}


