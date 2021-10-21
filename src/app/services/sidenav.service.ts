import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item } from '../models/route.model';
import { TotalType } from '../models/total-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private totalTracker = new BehaviorSubject<Item>(new Item());
  tracker$ = this.totalTracker.asObservable();

  constructor() { }

  changeItem(item: Item){
    this.totalTracker.next(item);
  }
}
