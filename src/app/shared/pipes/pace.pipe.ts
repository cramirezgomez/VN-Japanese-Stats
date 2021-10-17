import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pace'
})
export class PacePipe implements PipeTransform {

  transform(chars: number, mins: number): number {
    return Math.floor(chars / mins * 60)
  }

}
