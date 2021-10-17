import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/models/route.model';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnChanges{
  @Input()
  curItem!: Item;
  
  Math: any;
  constructor(public screen: ScreenService) { 
    this.Math = Math;
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    
  }

}
