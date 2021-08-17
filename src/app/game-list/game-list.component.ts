import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GamesService } from '../shared/games.service';
import { NotificationService } from '../shared/notification.service';
import { RoutesService } from '../shared/routes.service';
import { AddGameComponent } from './add-game/add-game.component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {

   
  Math: any;

  constructor(public gameService: GamesService, public routeService: RoutesService,
    private dialog: MatDialog, private notificationService:NotificationService) { 
    this.Math = Math;
  }

  ngOnInit(): void {}

  gameClicked (pos:number){
    this.gameService.setGame(this.gameService.gameArray[pos]);
    this.routeService.loadRoutes();
  }

  onCreate(){
    this.gameService.initializeGameFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddGameComponent, dialogConfig);
  }
  onDelete($key:string){
    if(confirm('Are you sure you want to delete this record?')){
      this.gameService.deleteGame($key);
      this.notificationService.warn('Deleted Successfully')
    } 
  }
  onEdit(game:any){
    this.gameService.populateForm(game);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddGameComponent, dialogConfig);
  }
}


