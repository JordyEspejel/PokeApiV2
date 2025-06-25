import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart',
  standalone: true,
})
export class PadStartPipe implements PipeTransform {

  transform(value: string | number, width: number, character: string = '0'): string {
    return String(value).padStart(width, character);
  }

}
