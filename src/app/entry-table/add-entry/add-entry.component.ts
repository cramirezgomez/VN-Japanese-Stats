import { Component, OnInit } from '@angular/core';
import { FBGame, Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/shared/games.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  constructor(public gameService: GamesService, public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onClear(){
    //console.log(this.gameService.entryForm.value.date);
    // this.entryData.forEach(element => {
    //   this.gameService.insertRoute(element);
    // });

    // Object.entries(this.entryData).forEach(
    //   ([key, value]) => this.gameService.insertEntry(value)
    // );

    // var test = new FBGame;
    // test.name = "Chris"
    // this.gameService.insertGame(test);
  


    this.gameService.entryForm.reset();
    this.gameService.initializeEntryFormGroup();
    //this.notificationService.success(':: Submitted Successfully');
  }
  
  onSubmit(){
    if(this.gameService.entryForm.valid){
      this.gameService.insertEntry(this.gameService.entryForm.value); //insert to database
      this.onClear();
      this.notificationService.success(':: Submitted Successfully');
    }
  }

}
