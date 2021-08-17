import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GamesService } from 'src/app/shared/games.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { RoutesService } from 'src/app/shared/routes.service';

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
      
      if(!this.routeService.routeForm.get('$key')?.value){
        this.routeService.insertRoute(this.routeService.routeForm.value); //insert to database
      }
      else{
        this.routeService.updateRouteManually(this.routeService.routeForm.value);
      }

      this.onClear();
      this.notificationService.success(':: Submitted Successfully');
      this.onClose();
    }
  }
}
