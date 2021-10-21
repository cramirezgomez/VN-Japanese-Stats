import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entry } from 'src/app/models/entry.model';
import { Item } from 'src/app/models/route.model';
import { TotalType } from 'src/app/models/total-type.enum';
import { AuthService } from 'src/app/services/auth.service';
import { EntriesService } from 'src/app/services/entries.service';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  @Input() totalItem: Item = new Item();

  constructor(public screen: ScreenService) { 
    
  }

  ngOnInit(): void {

  }

}
