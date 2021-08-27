import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FBGame } from '../models/game.model';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { GamesService } from '../services/games.service';
import { NotificationService } from '../services/notification.service';
import { RoutesService } from '../services/routes.service';
import { AddGameComponent } from './add-game/add-game.component';

@Component({
  selector: 'app-page-game',
  templateUrl: './page-game.component.html',
  styleUrls: ['./page-game.component.scss']
})
export class PageGameComponent implements OnInit {

  Math: any;

  constructor(public gameService: GamesService, public routeService: RoutesService,
    private dialog: MatDialog, private notificationService:NotificationService, 
    private dialogService: DialogService, public afAuth: AngularFireAuth, public authSer: AuthService ) { 
    this.Math = Math;
  }

  ngOnInit(): void {
    //this.gameService.setUserGames();

  }

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
  onDelete(game:FBGame){

    this.dialogService.openConfirmDialog('Are you sure you want to delete ' + game.name + '?')
    .afterClosed().subscribe(res => {
      if(res){
          this.gameService.deleteGame(game.$key);
          this.notificationService.warn(game.name + ' Was Deleted')
      }
    });
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
