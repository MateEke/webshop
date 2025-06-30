import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe<T> implements PipeTransform {
  transform(value: T[], sortBy: keyof T, direction: 'asc' | 'desc'): T[] {
    if (value?.length && typeof value[0]?.[sortBy] === 'string') {
      return value?.sort((a, b) => {
        return this.compareStrings(
          a[sortBy] as string,
          b[sortBy] as string,
          direction,
        );
      });
    }
    if (value?.length && typeof value[0]?.[sortBy] === 'number') {
      return value?.sort((a, b) => {
        return this.compareNumbers(
          a[sortBy] as number,
          b[sortBy] as number,
          direction,
        );
      });
    }
    return value;
  }

  private compareStrings(
    a: string,
    b: string,
    direction: 'asc' | 'desc',
  ): number {
    return a.localeCompare(b) * (direction === 'asc' ? 1 : -1);
  }

  private compareNumbers(
    a: number,
    b: number,
    direction: 'asc' | 'desc',
  ): number {
    return direction === 'asc' ? a - b : b - a;
  }
}
