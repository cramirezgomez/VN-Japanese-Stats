import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {

  }

  logOut(){
    this.afAuth.signOut();
  }

}
