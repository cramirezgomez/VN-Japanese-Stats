import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from '../shared/games.service';




@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss']
})

export class EntryTableComponent implements OnInit {
  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['date', 'chars', 'lines', 'mins', 'pace', 'actions'];
  Math: any;
  
  constructor(public gameService: GamesService) { 

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

}
