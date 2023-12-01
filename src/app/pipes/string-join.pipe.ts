import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringJoin',
  standalone: true,
})
export class StringJoinPipe implements PipeTransform {
  transform(value: string[] | null): string {
    return value?.join(', ') || '';
  }
}
