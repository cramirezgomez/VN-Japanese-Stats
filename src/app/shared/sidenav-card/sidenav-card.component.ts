import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/models/route.model';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-sidenav-card',
  templateUrl: './sidenav-card.component.html',
  styleUrls: ['./sidenav-card.component.scss']
})
export class SidenavCardComponent implements OnInit, OnChanges{
  @Input()
  curItem: Item = new Item();
  
  Math: any;
  constructor(public screen: ScreenService) { 
    this.Math = Math;
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    
  }

}
