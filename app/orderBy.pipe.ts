import { Pipe } from '@angular/core';

@Pipe({ name: 'orderBy', pure: false })

export class OrderByPipe {
  transform(array: Array<string>, args: string): Array<string> {
    if(array.length == 0 )
      return array;

    array.sort((a: any, b: any) => {
      var countryA: String = a["country"].toLowerCase();
      var countryB: String = b["country"].toLowerCase();

      if (countryA < countryB) {
        return -1;
      } else if (countryA > countryB) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
