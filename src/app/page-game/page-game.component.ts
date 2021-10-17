import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FBGame, Game } from '../models/game.model';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { GamesService } from '../services/games.service';
import { NotificationService } from '../services/notification.service';
import { RoutesService } from '../services/routes.service';
import { ScreenService } from '../services/screen.service';
import { AddGameComponent } from './add-game/add-game.component';

@Component({
  selector: 'app-page-game',
  templateUrl: './page-game.component.html',
  styleUrls: ['./page-game.component.scss']
})
export class PageGameComponent implements OnInit, OnDestroy {
  gameArray: any[] = []
  public allGames: FBGame = new FBGame;
  readonly dialogConfig = new MatDialogConfig();
  gameName = ' '
  Math: any;
  
  //Subs
  authSub: Subscription | undefined;
  gameSub: Subscription | undefined;
  dialogSub: Subscription | undefined;

  constructor(public gameService: GamesService, public routeService: RoutesService,
    private dialog: MatDialog, private notificationService:NotificationService, 
    private dialogService: DialogService, public afAuth: AngularFireAuth, public authSer: AuthService, public screen: ScreenService ) { 
    this.Math = Math;
  }
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.gameSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
  }

  ngOnInit(): void {
    //this.gameService.setUserGames();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "60%";

    this.authSub = this.authSer.afAuth.authState.subscribe(user => {
      var userKey = "";
      if (user) {
        userKey = user.uid;

        // load game database
        this.gameService.loadGamesDatabase(userKey);

        //subscribe to game array
        this.gameSub = this.gameService.getGames().subscribe(list => {
          this.gameArray = list;
    
          //update total stats
          let emptyGame = new Game();
          if(this.authSer.userName){
            emptyGame.name = this.authSer.userName;
          }
          emptyGame.link = "/assets/img/allGames.jpg"
          this.allGames = this.gameArray.reduce((acc, cur) => {
            acc.chars += (cur.chars || 0);
            acc.lines += (cur.lines || 0);
            acc.mins += (cur.mins || 0);
            acc.days += (cur.days || 0);
            return acc;
          }, emptyGame);
          this.gameService.allGames = this.allGames;
        });
      }
    });


  }

  onCreate(){
    this.gameService.initializeGameFormGroup();
    this.dialog.open(AddGameComponent, this.dialogConfig);
  }
  onDelete(game:FBGame){

    this.dialogSub = this.dialogService.openConfirmDialog('Are you sure you want to delete ' + game.name + '?')
    .afterClosed().subscribe(res => {
      if(res){
          this.gameService.deleteGame(game.$key);
          this.notificationService.warn(game.name + ' Was Deleted')
      }
    });
  }
  onEdit(game:any){
    this.gameService.populateForm(game);
    
    this.dialog.open(AddGameComponent, this.dialogConfig);
  }

}
