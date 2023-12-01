import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }

    return value
      .split(' ')
      ?.reduce((prev, curr) => (prev += curr[0]), '')
      ?.slice(0, 2);
  }
}
