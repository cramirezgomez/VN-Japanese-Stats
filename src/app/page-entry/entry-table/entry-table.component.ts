import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { DownloadService } from 'src/app/services/download.service';
import { ScreenService } from 'src/app/services/screen.service';

import { FBRoute } from '../../models/route.model';
import { DialogService } from '../../services/dialog.service';
import { EntriesService } from '../../services/entries.service';
import { GamesService } from '../../services/games.service';
import { NotificationService } from '../../services/notification.service';
import { RoutesService } from '../../services/routes.service';
import { AddEntryComponent } from '.././add-entry/add-entry.component';


@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html'
})

export class EntryTableComponent implements OnInit {
  
  listData!: MatTableDataSource<any>;

  @Input() displayedColumns: string[] = ['date',  'lines', 'chars', 'mins', 'pace', 'actions'];
  
  Math: any;
    
  constructor(public gameService: GamesService, public routeService: RoutesService, public entryService:EntriesService,
    private dialog: MatDialog, private notificationService:NotificationService, private dialogService: DialogService, 
    public router: Router, public authSer: AuthService, private dlSer: DownloadService, public screen: ScreenService) { 
      this.Math = Math;
      
    
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey:string = "";

  ngOnInit(): void {
    this.authSer.afAuth.authState.subscribe(user => {
      var userKey = "";
      if (user) {
        userKey = user.uid;
        this.entryService.getAllEntriesFL(userKey)
        
        if(this.router.url == "/settings"){
          this.subscribeToAllFL();
        }
        else{
          if(this.routeService.curRoute.name == ""){
            console.log("Error: Route not set,going to VN List");
            this.router.navigate(['/game_list']); 
            return;
          }
          this.subscribeToFilteredFL();
        }
      }
    });


    
    
    
      
  }

  subscribeToFilteredFL(){
    this.entryService.getEntriesForRoute().subscribe(
      list => {
        let entryArray = list.map(item => {
          return {
            $key: item.key,
            pace: Number(item.payload.val()?.chars) / Number(item.payload.val()?.mins) * 60,
            time: Math.floor(Number(item.payload.val()?.mins) / 60) + ":" + ('0' + (Number(item.payload.val()?.mins) % 60).toString()).slice(-2),
            ...item.payload.val()

          };
        });
        //filter route
        entryArray = entryArray.filter(item => {
          if(item.route == this.gameService.curGame.name + '/' + this.routeService.curRoute.name){
            return true;
          }
          else{ 
            return false;
          }
        })
        //
        this.listData = new MatTableDataSource(entryArray);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        
        this.listData.filterPredicate = (data, filter) => {
          //restict filter operation
          return this.displayedColumns.some( ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          })
        };

        //update route stats
        let emptyRoute = new FBRoute();
        emptyRoute.game = this.routeService.curRoute.game;
        emptyRoute.name = this.routeService.curRoute.name;
        emptyRoute.link = this.routeService.curRoute.link;
        emptyRoute.$key = this.routeService.curRoute.$key;
        this.routeService.curRoute = entryArray.reduce((acc, cur) => {
          acc.chars += (cur.chars || 0);
          acc.lines += (cur.lines || 0);
          acc.mins += (cur.mins || 0);
          acc.days += 1;
          return acc;
        }, emptyRoute);

        

      });
  }

  subscribeToAllFL(){
    this.entryService.getEntriesForRoute().subscribe(
      list => {
        
        var initialValue = {}
        let entryArray = list.map(item => {
          
         
          var myArr = item.payload.val()!.route.split("/");
          
          

          return {
            $key: item.key,
            pace: Number(item.payload.val()?.chars) / Number(item.payload.val()?.mins) * 60,
            game: myArr? myArr[0] : "Unknown",
            heroine: myArr? myArr[1] : "Unknown",
            time: Math.floor(Number(item.payload.val()?.mins) / 60) + ":" + ('0' + (Number(item.payload.val()?.mins) % 60).toString()).slice(-2),
            ...item.payload.val()

          };
        });

        //console.log(entryArray)

        let urlArray = list.reduce(function(previousValue, currentValue) {
          let curObj = {
            [currentValue.key!]:{
              ...currentValue.payload.val()
            }
          }
          return _.merge(previousValue, curObj)
        }, initialValue)
      
        

        this.dlSer.generateDownloadJsonUri(urlArray);

        this.listData = new MatTableDataSource(entryArray);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          //restict filter operation
          return this.displayedColumns.some( ele => {
            return data[ele].toLowerCase().indexOf(filter) != -1;
          })
        };

        //update route stats
        let emptyRoute = new FBRoute();
        emptyRoute.game = this.routeService.curRoute.game;
        emptyRoute.name = this.routeService.curRoute.name;
        emptyRoute.link = this.routeService.curRoute.link;
        emptyRoute.$key = this.routeService.curRoute.$key;
        this.routeService.curRoute = entryArray.reduce((acc, cur) => {
          acc.chars += (cur.chars || 0);
          acc.lines += (cur.lines || 0);
          acc.mins += (cur.mins || 0);
          acc.days += 1;
          return acc;
        }, emptyRoute);

        

      });
  }
  
  onDelete($key:string){
    this.dialogService.openConfirmDialog('Are you sure you want to delete this entry?')
    .afterClosed().subscribe(res => {
      if(res){
        this.entryService.deleteEntry($key);
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
    this.dialog.open(AddEntryComponent, dialogConfig);
  }
  

}
