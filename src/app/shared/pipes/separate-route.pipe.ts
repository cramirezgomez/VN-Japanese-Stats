import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separateRoute'
})
export class SeparateRoutePipe implements PipeTransform {

  transform(whole: string, option: string): string {
    var split = whole.split("/");
  
    if(split.length == 2){
      switch(option){
        case "game": return split[0];
        case "route": return split[1];
      }
    }
    return whole;
    
  }

}
