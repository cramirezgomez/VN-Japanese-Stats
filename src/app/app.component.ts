import { Component } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { EntriesService } from './services/entries.service';
import { GamesService } from './services/games.service';
import { RoutesService } from './services/routes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vn-app';

  constructor(public authSer: AuthService, public afAuth: AngularFireAuth, private gameSer: GamesService,
    private routeSer: RoutesService){
    authSer.afAuth.authState.subscribe(user => {
      var userKey = "";
      if (user) {
        userKey = user.uid;

        //load firelists in all services
        this.gameSer.loadGames(userKey);
        this.routeSer.getAllRoutesFL(userKey);
       // this.entrySer.getAllEntriesFL(userKey)
      }
    });
  }

  



}

