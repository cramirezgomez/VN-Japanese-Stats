import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public screen: ScreenService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.afAuth.signOut();
  }

}
