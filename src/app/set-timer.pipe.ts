import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setTimer'
})
export class SetTimerPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
