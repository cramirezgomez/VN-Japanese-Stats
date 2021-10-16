import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FBGame } from 'src/app/models/game.model';
import { FBRoute } from 'src/app/models/route.model';
import { EntriesService } from 'src/app/services/entries.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html'
})
export class AddEntryComponent implements OnInit {
  curGame: FBGame = {
    $key: '',
    chars: 0,
    days: 0,
    lines: 0,
    link: '',
    mins: 0,
    name: ''
  }
  curRoute:FBRoute ={
    $key: '',
    game: '',
    chars: 20,
    days: 20,
    lines: 20,
    link: '',
    mins: 20,
    name: ''
  }

  constructor(public entryService: EntriesService,
    public notificationService: NotificationService, 
    private dialogRef:MatDialogRef<AddEntryComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.curGame = this.data.game;
    console.log(this.data.game)
  }

  onClear(){
    this.entryService.entryForm.reset();
    this.entryService.initializeEntryFormGroup();
  }
  onClose(){
    this.entryService.entryForm.reset();
    this.entryService.initializeEntryFormGroup();
    this.dialogRef.close();
  }
  
  onSubmit(){
    if(this.entryService.entryForm.valid){
      if(!this.entryService.entryForm.get('$key')?.value){
        this.entryService.insertEntry(this.entryService.entryForm.value, this.curGame, this.curRoute);
        this.onClear();
        this.notificationService.success('Entry Was Added');
      }
      else{
        this.entryService.updateEntry(this.entryService.entryForm.value, this.curGame, this.curRoute);
        this.onClear();
        this.notificationService.success('Entry Was Changed');
      }
      this.onClose();
      
      
    }
  }

}
