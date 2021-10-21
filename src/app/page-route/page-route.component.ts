import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FBGame } from '../models/game.model';
import { FBRoute } from '../models/route.model';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { GamesService } from '../services/games.service';
import { NotificationService } from '../services/notification.service';
import { RoutesService } from '../services/routes.service';
import { ScreenService } from '../services/screen.service';
import { SidenavService } from '../services/sidenav.service';
import { AddRouteComponent } from './add-route/add-route.component';

@Component({
  selector: 'app-page-route',
  templateUrl: './page-route.component.html',
  styleUrls: ['./page-route.component.scss']
})
export class PageRouteComponent implements OnInit, OnDestroy {
  routeArray:FBRoute[] = [];
  dialogConfig = new MatDialogConfig();
  gameName = ''
  curGame: FBGame  = new FBGame();
  
  Math: any;

  //Subs
  authSub: Subscription | undefined;
  gameSub: Subscription | undefined;
  routeSub: Subscription | undefined;
  dialogSub: Subscription | undefined;

  constructor(public routeService: RoutesService, public gameService: GamesService,
    private dialog: MatDialog, private notificationService:NotificationService, private dialogService: DialogService,
    private router: Router, public screen: ScreenService, private actRoute: ActivatedRoute, private authSer: AuthService,
    private sidenavSer: SidenavService) { 
    this.Math = Math;
    let gameInput = this.actRoute.snapshot.params['gameName'];
    this.gameName = gameInput;

  }
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.gameSub?.unsubscribe();
    this.routeSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.authSub =  this.authSer.afAuth.authState.subscribe(user => {
      var userKey = "";
      if (user) {
        userKey = user.uid;

        //load databases
        this.gameService.loadGamesDatabase(userKey)
        this.routeService.loadRoutesDatabase(userKey, this.gameName);

        //get game for totals
        this.gameSub = this.gameService.getGame(userKey,this.gameName).subscribe(data =>{
          if(data && data.length > 0){
            this.curGame = data[0];
            this.sidenavSer.changeItem(this.curGame);
          }
          else{
            this.router.navigate(['vn_list']);
          }
        }) ;

        //get all routes
        this.routeSub = this.routeService.getRoutes(this.gameName).subscribe( data =>{
          this.routeArray = data;
        })
      }
    });
  }


  private configureDialog() {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "60%";
    this.dialogConfig.data = {
      game: this.curGame,
    };
  }

  onCreate(){
    this.configureDialog();
    this.routeService.initializeRouteFormGroup();
    this.dialog.open(AddRouteComponent, this.dialogConfig);
  }
  onDelete(route: FBRoute){
    this.dialogSub = this.dialogService.openConfirmDialog('Are you sure you want to delete ' + route.name + '?')
    .afterClosed().subscribe(res => {
      if(res){
        this.routeService.deleteRoute(route.$key, this.curGame);
        this.notificationService.warn(route.name + ' Was Deleted')
      }
    });

    

  }
  onEdit(route:any){
    this.configureDialog();
    this.routeService.populateForm(route);
    this.dialog.open(AddRouteComponent, this.dialogConfig);
  }

}
