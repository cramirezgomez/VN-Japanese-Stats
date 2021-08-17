import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GamesService } from '../shared/games.service';
import { NotificationService } from '../shared/notification.service';
import { RoutesService } from '../shared/routes.service';
import { AddRouteComponent } from './add-route/add-route.component';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html'
})
export class RouteListComponent implements OnInit {

  Math: any;

  constructor(public routeService: RoutesService, public gameService: GamesService,
    private dialog: MatDialog, private notificationService:NotificationService) { 
    this.Math = Math;
  }

  ngOnInit(): void {
  }

  routeClicked (pos:number){
    this.routeService.setRoute(this.routeService.routeArray[pos]);
  }
  onCreate(){
    this.routeService.initializeRouteFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddRouteComponent, dialogConfig);
  }
  onDelete($key:string){
    if(confirm('Are you sure you want to delete this record?')){
      this.routeService.deleteRoute($key);
      this.notificationService.warn('Deleted Successfully')
    } 
  }
  onEdit(route:any){
    this.routeService.populateForm(route);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddRouteComponent, dialogConfig);
  }
}


