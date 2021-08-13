import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/shared/games.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  constructor(public gameService: GamesService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.gameService.initializeGameFormGroup();
  }

  onClear(){
    this.gameService.gameForm.reset();
    this.gameService.initializeRouteFormGroup();
  }
  
  onSubmit(){
    if(this.gameService.gameForm.valid){
      this.gameService.insertGame(this.gameService.gameForm.value); //insert to database
      this.onClear();
      this.notificationService.success(':: Submitted Successfully');
    }
  }

}
