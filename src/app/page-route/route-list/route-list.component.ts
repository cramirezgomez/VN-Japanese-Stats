import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FBRoute } from '../../models/route.model';
import { DialogService } from '../../services/dialog.service';
import { GamesService } from '../../services/games.service';
import { NotificationService } from '../../services/notification.service';
import { RoutesService } from '../../services/routes.service';
import { AddRouteComponent } from '../add-route/add-route.component';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html'
})
export class RouteListComponent implements OnInit {

  Math: any;

  constructor(public routeService: RoutesService, public gameService: GamesService,
    private dialog: MatDialog, private notificationService:NotificationService, private dialogService: DialogService,
    private router: Router, ) { 
    this.Math = Math;
  }

  ngOnInit(): void {
    if(this.gameService.curGame.name == ""){
      console.log("Error: Route not set,going to VN List");
      this.router.navigate(['/game_list']); 
    }
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
  onDelete(route: FBRoute){
    this.dialogService.openConfirmDialog('Are you sure you want to delete ' + route.name + '?')
    .afterClosed().subscribe(res => {
      if(res){
        this.routeService.deleteRoute(route.$key);
        this.notificationService.warn(route.name + ' Was Deleted')
      }
    });

    

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


