import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EntriesService } from 'src/app/shared/entries.service';
import { NotificationService } from 'src/app/shared/notification.service';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html'
})
export class AddEntryComponent implements OnInit {

  constructor(public entryService: EntriesService,
    public notificationService: NotificationService, 
    private dialogRef:MatDialogRef<AddEntryComponent>) { }

  ngOnInit(): void {
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
        this.entryService.insertEntry(this.entryService.entryForm.value);
      }
      else{
        this.entryService.updateEntry(this.entryService.entryForm.value);
      }
      
      this.onClear();
      this.notificationService.success(':: Submitted Successfully');
      this.onClose();
    }
  }

}
