import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GamesService } from 'src/app/shared/games.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  constructor(public gameService: GamesService, public notificationService: NotificationService, 
    private dialogRef:MatDialogRef<AddEntryComponent>) { }

  ngOnInit(): void {
  }

  onClear(){
    this.gameService.entryForm.reset();
    this.gameService.initializeEntryFormGroup();
  }
  onClose(){
    this.gameService.entryForm.reset();
    this.gameService.initializeEntryFormGroup();
    this.dialogRef.close();
  }
  
  onSubmit(){
    if(this.gameService.entryForm.valid){
      if(!this.gameService.entryForm.get('$key')?.value){
        this.gameService.insertEntry(this.gameService.entryForm.value);
      }
      else{
        this.gameService.updateEntry(this.gameService.entryForm.value);
      }
      
      this.onClear();
      this.notificationService.success(':: Submitted Successfully');
      this.onClose();
    }
  }

}
