import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: number): string {
    let hours = Math.floor(time / 60);
    let mins = time % 60;
    let extra = '';
    if(mins < 10){
      extra = '0'
    }
    return `${hours}:${extra}${mins}`;
  }

}
