import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app'


import { Observable, of} from 'rxjs';
import { switchMap } from  'rxjs/operators'
import { User } from '../models/user.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private vndb: AngularFireDatabase, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user =>{
        if (user){
          return this.vndb.list<User>('users', ref => ref.orderByChild('uid').equalTo(user.uid)).valueChanges();
        }
        else{
          return of(null);
        }
      })
    );
  }

  async googleSignIn(){
    console.log("tried")
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut(){
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  
  updateUserData(user: any) {
    // const userRef = this.vndb.list('users').query.orderByChild("userID").equalTo(user.userID).on;

    const userRef = this.vndb.list('/users', ref => ref.orderByChild('uid').equalTo(user.userID))
    
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.update(data.uid, data);
  }

  


  
}
