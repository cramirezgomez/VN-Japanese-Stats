import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/route.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input()
  curItem!: Item;
  
  Math: any;
  constructor() { 
    this.Math = Math;
  }

  ngOnInit(): void {
  }

}
