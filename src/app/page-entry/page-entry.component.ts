import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FBGame } from '../models/game.model';
import { FBRoute } from '../models/route.model';
import { EntriesService } from '../services/entries.service';
import { GamesService } from '../services/games.service';
import { RoutesService } from '../services/routes.service';
import { ScreenService } from '../services/screen.service';
import { AddEntryComponent } from './add-entry/add-entry.component';



@Component({
  selector: 'app-page-entry',
  templateUrl: './page-entry.component.html',
  styleUrls: ['./page-entry.component.scss']
})
export class PageEntryComponent implements OnInit {
  curGame: FBGame = {
    $key: '',
    chars: 0,
    days: 0,
    lines: 0,
    link: '',
    mins: 0,
    name: ''
  };
  curRoute: FBRoute = {
    $key: '',
    game: '',
    chars: 0,
    days: 0,
    lines: 0,
    link: '',
    mins: 0,
    name: ''
  };
  //public gameService: GamesService
  //
  //private dialog: MatDialog
  //private notificationService:NotificationService
  //private dialogService: DialogService, 
  //private router: Router

  constructor(public gameService: GamesService, public routeService: RoutesService, public entryService:EntriesService, 
    private dialog: MatDialog,  public screen: ScreenService, private actRoute: ActivatedRoute)
  {
    let gameInput = this.actRoute.snapshot.params['gameName'];
    let routeInput = this.actRoute.snapshot.params['routeName']
    console.log("We got: " + gameInput + " and " + routeInput);
    
  }

  ngOnInit(): void {

  }

  onCreate(){

    this.entryService.initializeEntryFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      game: this.curGame,
      route: this.curRoute
    }
    this.dialog.open(AddEntryComponent, dialogConfig);

    // let temp: Entry[] = [];
    // this.entryService.insertManual(temp);

  }

  

}
