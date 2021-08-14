import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from '../shared/games.service';
import { NotificationService } from '../shared/notification.service';
import { AddEntryComponent } from './add-entry/add-entry.component';




@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss']
})

export class EntryTableComponent implements OnInit {
  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['date', 'chars', 'lines', 'mins', 'pace', 'actions'];
  Math: any;
  
  constructor(public gameService: GamesService, private dialog: MatDialog, private notificationService:NotificationService) { 

    this.Math = Math;
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey:string = "";

  ngOnInit(): void {
    this.gameService.getEntriesForRoute().subscribe(
      list => {
        //map to array
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
          if(item.route == this.gameService.curGame.name + '/' + this.gameService.curRoute.name){
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

      });
  }
  onCreate(){
    this.gameService.initializeEntryFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddEntryComponent, dialogConfig);
  }
  onDelete($key:string){
    if(confirm('Are you sure you want to delete this record?')){
      this.gameService.deleteEntry($key);
      this.notificationService.warn('Deleted Successfully')
    } 
  }
  onEdit(row:any){
    this.gameService.curEntry = row;
    //console.log(row);
    this.gameService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddEntryComponent, dialogConfig);
  }

}
