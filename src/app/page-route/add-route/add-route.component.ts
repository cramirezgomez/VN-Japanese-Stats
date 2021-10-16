import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FBGame } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html'
})
export class AddRouteComponent implements OnInit {
  curGame: FBGame = {
    $key: '',
    chars: 10,
    days: 10,
    lines: 10,
    link: '',
    mins: 10,
    name: ''
  }
  
  constructor(public routeService: RoutesService, public notificationService: NotificationService, 
    private dialogRef:MatDialogRef<AddRouteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
     
     }

  ngOnInit(): void {
    this.curGame = this.data.game;
    console.log(this.data.game)
  }

  onClear(){
    this.routeService.routeForm.reset();
    this.routeService.initializeRouteFormGroup();
  }
  
  
  
  

  onClose(){
    this.routeService.routeForm.reset();
    this.routeService.initializeRouteFormGroup();
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.routeService.routeForm.valid){

      let myName = "";
      myName = this.routeService.routeForm.value.name;
      

      if(!this.routeService.routeForm.get('$key')?.value){
        this.routeService.insertRoute(this.routeService.routeForm.value, this.curGame); //insert to database
        this.onClear();
        this.notificationService.success(myName +' Was Added');
      }
      else{
        this.routeService.updateRouteManually(this.routeService.routeForm.value, this.curGame);
        this.onClear();
        this.notificationService.success(myName +' Was Changed');
      }
      this.onClose();
      
      
      
    }
  }
}
