import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

const SMALL_WIDTH_BREAKPOINT = 800;
@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  mobile = false;
  



  constructor( private breakpointObserver: BreakpointObserver,) {
    // if (window.screen.width < 800) { // 768px portrait
    //   this.mobile = true;
    // }
    this.breakpointObserver.observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe((state: BreakpointState) => {
      this.mobile = state.matches;
    });

    
   }
}
