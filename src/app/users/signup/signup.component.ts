import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { GamesService } from 'src/app/shared/games.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  firebaseErrorMsg: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private gameService : GamesService) {
    this.firebaseErrorMsg = "";
   }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)

    });
  }

  signUp(){
    if(this.signupForm?.invalid){
      return;
    }
    this.authService.signupUser(this.signupForm?.value).then((result: { isValid: boolean; message: string; } | null) => {
      if (result == null){                                 // null is success, false means there was an error
          this.router.navigate(['/game_list']);
      }
      else if (result.isValid == false)
          this.firebaseErrorMsg = result.message;
  }).catch(() => {

  });

  }

}
