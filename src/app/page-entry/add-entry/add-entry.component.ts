import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FBEntry } from 'src/app/models/entry.model';
import { FBGame } from 'src/app/models/game.model';
import { FBRoute } from 'src/app/models/route.model';
import { EntriesService } from 'src/app/services/entries.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html'
})
export class AddEntryComponent implements OnInit {
  curGame = new FBGame();
  curRoute = new FBRoute();
  oldEntry = new FBEntry();

  //
  gameTotal: FBEntry = new FBEntry();
  routeTotal: FBEntry = new FBEntry();

  constructor(public entryService: EntriesService, public notificationService: NotificationService, 
    private dialogRef:MatDialogRef<AddEntryComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit(): void {
    this.curGame = this.data.game;
    this.curRoute = this.data.route;
    this.oldEntry = this.data.oldEntry;

    //total
    this.routeTotal = this.data.routeTotal;
    this.gameTotal = this.data.gameTotal;
    console.log(this.routeTotal)
    console.log(this.gameTotal)
    
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
        this.entryService.insertEntry(this.entryService.entryForm.value, this.curGame, this.curRoute, this.gameTotal, this.routeTotal);
        this.onClear();
        this.notificationService.success('Entry Was Added');
      }
      else{
        this.entryService.updateEntry(this.entryService.entryForm.value,this.oldEntry,this.curGame, this.curRoute, this.gameTotal, this.routeTotal);
        this.onClear();
        this.notificationService.success('Entry Was Changed');
      }
      this.onClose();
      
      
    }
  }

}
