import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  games: any = [
    {
      "name":"Aoi Tori",
      "routes":[
        {
          "name":"Sayou",
          "data": {"date": "0", "chars": 5, "lines": 6,"mins": 7}
        },
        {
          "name":"Akari",
          "data": {"date": "1", "chars": 1, "lines": 2,"mins": 3}
        }
      ]
      
      
    },
    {
      "name":"Amatsutsumi",
      "routes":[
        {
          "name":"Kokoro",
          "data": {"date": "0", "chars": 5, "lines": 6,"mins": 7}
        },
        {
          "name":"Hotaru",
          "data": {"date": "1", "chars": 1, "lines": 2,"mins": 3}
        }
      ]
      
      
    }
  ];

  curGame: number = -1;
  // curRoute: number = -1;

  getAllGames(){
    let allNames: String[]  = [];

    //get only names
    this.games.forEach((element: { name: String; }) => {
      allNames.push(element.name)
    });

    return allNames;
  }

  //get info for game
  getGame(){
    if (this.curGame == -1){
      return {
        "name":"Empty",
        "routes":[

        ]
      }
    }
    return this.games[this.curGame];
  }

  

  //set game after clicked
  setGame(pos:number){
    this.curGame = pos;
  }

  getRoute(pos:number){

  }
}
