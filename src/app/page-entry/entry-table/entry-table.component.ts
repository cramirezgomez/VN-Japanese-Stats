import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { FBEntry } from 'src/app/models/entry.model';
import { FBGame } from 'src/app/models/game.model';
import { AuthService } from 'src/app/services/auth.service';
import { DownloadService } from 'src/app/services/download.service';
import { ScreenService } from 'src/app/services/screen.service';
import { PacePipe } from 'src/app/shared/pipes/pace.pipe';
import { SeparateRoutePipe } from 'src/app/shared/pipes/separate-route.pipe';
import { TimePipe } from 'src/app/shared/pipes/time.pipe';

import { FBRoute, Item } from '../../models/route.model';
import { DialogService } from '../../services/dialog.service';
import { EntriesService } from '../../services/entries.service';
import { GamesService } from '../../services/games.service';
import { NotificationService } from '../../services/notification.service';
import { RoutesService } from '../../services/routes.service';
import { AddEntryComponent } from '.././add-entry/add-entry.component';


@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss']
})

export class EntryTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() entryList: FBEntry[] = [];

  @Input() curGame = new FBGame();
  @Input() curRoute = new FBRoute()
  
  listData!: MatTableDataSource<any>;

  @Input() displayedColumns: string[] = ['date',  'lines', 'chars', 'mins', 'pace', 'actions'];
  
  Math: any;

  dialogSub: Subscription | undefined;
    
  constructor(public gameService: GamesService, public routeService: RoutesService, public entryService:EntriesService,
    private dialog: MatDialog, private notificationService:NotificationService, private dialogService: DialogService, 
    public router: Router, public authSer: AuthService,
    private sepPipe: SeparateRoutePipe, private pacePipe: PacePipe) { 
      this.Math = Math;
      
    
  }
  ngOnDestroy(): void {
    this.dialogSub?.unsubscribe();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey:string = "";

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.addTableElem(this.entryList);
  }

  private addTableElem(entryArray: FBEntry[]) {
    let updatedEntries = [];
    updatedEntries = entryArray.map(x => {
      return {
        ...x,
        game: this.sepPipe.transform(x.route, "game"),
        heroine: this.sepPipe.transform(x.route, "route"),
        pace: this.pacePipe.transform(x.chars, x.mins),
      }
    });
    this.listData = new MatTableDataSource(updatedEntries);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = (data, filter) => {
      //restict filter operation
      return this.displayedColumns.some(ele => {
        return data[ele].toLowerCase().indexOf(filter) != -1;
      });
    };
  }

  onDelete(entry: FBEntry){
    this.dialogSub = this.dialogService.openConfirmDialog('Are you sure you want to delete this entry?')
    .afterClosed().subscribe(res => {
      if(res){
        this.entryService.deleteEntry(entry, this.curGame, this.curRoute);
        this.notificationService.warn('Entry Was Deleted')
      }
    });
  }
  onEdit(row:any){
    this.entryService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      game: this.curGame,
      route: this.curRoute,
      oldEntry: row
    }
    this.dialog.open(AddEntryComponent, dialogConfig);
  }
  

}
