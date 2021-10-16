import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FBGame } from '../models/game.model';
import { FBRoute } from '../models/route.model';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { GamesService } from '../services/games.service';
import { NotificationService } from '../services/notification.service';
import { RoutesService } from '../services/routes.service';
import { ScreenService } from '../services/screen.service';
import { AddRouteComponent } from './add-route/add-route.component';

@Component({
  selector: 'app-page-route',
  templateUrl: './page-route.component.html',
  styleUrls: ['./page-route.component.scss']
})
export class PageRouteComponent implements OnInit {

  dialogConfig = new MatDialogConfig();
  gameName = ''
  curGame: FBGame = {
    $key: '',
    chars: 0,
    days: 0,
    lines: 0,
    link: '',
    mins: 0,
    name: 'Route Page Sample'
  };
  
  Math: any;

  constructor(public routeService: RoutesService, public gameService: GamesService,
    private dialog: MatDialog, private notificationService:NotificationService, private dialogService: DialogService,
    private router: Router, public screen: ScreenService, private actRoute: ActivatedRoute, private authSer: AuthService) { 
    this.Math = Math;
    let gameInput = this.actRoute.snapshot.params['gameName'];
    console.log("We got: " + gameInput)
    this.gameName = gameInput;

  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "60%";
    this.dialogConfig.data = {
      game: this.curGame,
    }
    
    this.authSer.afAuth.authState.subscribe(user => {
      var userKey = "";
      if (user) {
        userKey = user.uid;

        //load databases
        this.gameService.loadGamesDatabase(userKey)
        this.routeService.loadRoutesDatabase(userKey);

        //get game for totals
        this.gameService.getGame(userKey,this.gameName).subscribe() ;

        //get 
      }
    });
    
    


  }

  routeClicked (pos:number){
    this.routeService.setRoute(this.routeService.routeArray[pos]);
  }
  onCreate(){
    this.routeService.initializeRouteFormGroup();
    

    this.dialog.open(AddRouteComponent, this.dialogConfig);
  }
  onDelete(route: FBRoute){
    this.dialogService.openConfirmDialog('Are you sure you want to delete ' + route.name + '?')
    .afterClosed().subscribe(res => {
      if(res){
        this.routeService.deleteRoute(route.$key, this.curGame);
        this.notificationService.warn(route.name + ' Was Deleted')
      }
    });

    

  }
  onEdit(route:any){
    this.routeService.populateForm(route);
    this.dialog.open(AddRouteComponent, this.dialogConfig);
  }

}
