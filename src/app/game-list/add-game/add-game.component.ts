import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GamesService } from 'src/app/shared/games.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html'
})
export class AddGameComponent implements OnInit {

  constructor(public gameService: GamesService, public notificationService: NotificationService, 
    private dialogRef:MatDialogRef<AddGameComponent>) { }

  ngOnInit(): void {
    
  }

  onClear(){
    this.gameService.gameForm.reset();
    this.gameService.initializeGameFormGroup();
  }
  
  

  onClose(){
    this.gameService.gameForm.reset();
    this.gameService.initializeGameFormGroup();
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.gameService.gameForm.valid){
      
      if(!this.gameService.gameForm.get('$key')?.value){
        this.gameService.insertGame(this.gameService.gameForm.value); //insert to database
      }
      else{
        this.gameService.updateGameManually(this.gameService.gameForm.value);
      }
      this.onClear();
      this.notificationService.success(':: Submitted Successfully');
      this.onClose();
    }
  }

}
