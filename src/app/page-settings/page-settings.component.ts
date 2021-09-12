import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { DownloadService } from '../services/download.service';
import { EntriesService } from '../services/entries.service';
import { GamesService } from '../services/games.service';
import { ScreenService } from '../services/screen.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {

  constructor(public entryService: EntriesService, public gameService: GamesService,
    public authSer: AuthService, public dlSer: DownloadService, public screen: ScreenService) {
   }

  ngOnInit(): void {
  }

  

}
