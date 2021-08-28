import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GamesService } from 'src/app/services/games.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html'
})
export class AddRouteComponent implements OnInit {

  constructor(public routeService: RoutesService, public notificationService: NotificationService, 
    private dialogRef:MatDialogRef<AddRouteComponent>) { }

  ngOnInit(): void {
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
        this.routeService.insertRoute(this.routeService.routeForm.value); //insert to database
        this.onClear();
        this.notificationService.success(myName +' Was Added');
      }
      else{
        this.routeService.updateRouteManually(this.routeService.routeForm.value);
        this.onClear();
        this.notificationService.success(myName +' Was Changed');
      }
      this.onClose();
      
      
      
    }
  }
}