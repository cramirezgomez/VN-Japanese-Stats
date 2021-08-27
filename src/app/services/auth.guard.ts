import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth, public notificationService: NotificationService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        this.afAuth.onAuthStateChanged((user) => {
            if (user) {

                // if (!user.emailVerified)                            // if the user hasn't verified their email, send them to that page
                //     this.router.navigate(['/verify-email']);

                resolve(true);
            } else {
              this.notificationService.warn('Login/Sign Up first!');
              
                this.router.navigate(['/home']);                   // a logged out user will always be sent to home
                resolve(false);
            }
        });
    });

  }
  
}
