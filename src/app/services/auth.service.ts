import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn: boolean;
  userKey: string | undefined;
  userName: string | null | undefined;

  constructor(private router: Router, public afAuth: AngularFireAuth) { 
    this.userLoggedIn = false;
    

    this.afAuth.onAuthStateChanged((user) => {
      if(user){
        this.userLoggedIn = true;
        this.userName = user.displayName;
      }
      else{
        this.userLoggedIn = false;
      }
    })
  }

  async loginUser(email: string, password: string): Promise<any> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Auth Service: loginUser: success');
    } catch (error) {
      console.log('Auth Service: login error...');
      console.log('error code', error.code);
      console.log('error', error);
      if (error.code)
        return { isValid: false, message: error.message };
    }
}


  async signupUser(user: any): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      let emailLower = user.email.toLowerCase();
      result.user!.sendEmailVerification(); // immediately send the user a verification email
    } catch (error) {
      console.log('Auth Service: signup error', error);
      if (error.code)
        return { isValid: false, message: error.message };
    }
  }
}
