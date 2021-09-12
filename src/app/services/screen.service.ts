import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  mobile = false;

  constructor() {
    if (window.screen.width < 700) { // 768px portrait
      this.mobile = true;
    }
   }
}
