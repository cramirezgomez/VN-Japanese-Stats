import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {

  }

  logOut(){
    this.afAuth.signOut();
  }

}
