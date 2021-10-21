import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entry } from 'src/app/models/entry.model';
import { Item } from 'src/app/models/route.model';
import { TotalType } from 'src/app/models/total-type.enum';
import { AuthService } from 'src/app/services/auth.service';
import { EntriesService } from 'src/app/services/entries.service';
import { ScreenService } from 'src/app/services/screen.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  totalType:TotalType = TotalType.Total;
  entries: Entry[] = []
  totalItem: Item = new Item();

  constructor(public screen: ScreenService, private sidenavSer: SidenavService, private entryService: EntriesService,
    private authSer: AuthService) { 
    
  }

  ngOnInit(): void {

   
    this.sidenavSer.tracker$.subscribe(data => {
      this.totalItem = data;
    })
  }

}
