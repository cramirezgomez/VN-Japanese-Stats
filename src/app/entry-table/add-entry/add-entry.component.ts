import { Component, OnInit } from '@angular/core';
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
    this.gameService.entryForm.reset();
    this.gameService.initializeFormGroup();
    //this.notificationService.success(':: Submitted Successfully');
  }

  onSubmit(){
    if(this.gameService.entryForm.valid){
      //this.gameService.insertEmployee(this.gameService.form.value); //insert to database
      this.onClear();
      this.notificationService.success(':: Submitted Successfully');
    }
  }

}
