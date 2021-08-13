import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/shared/games.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent implements OnInit {

  constructor(public gameService: GamesService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.gameService.initializeRouteFormGroup();
  }

  onClear(){
    this.gameService.routeForm.reset();
    this.gameService.initializeRouteFormGroup();
  }
  
  onSubmit(){
    if(this.gameService.routeForm.valid){
      this.gameService.insertRoute(this.gameService.routeForm.value); //insert to database
      this.onClear();
      this.notificationService.success(':: Submitted Successfully');
    }
  }
}
