import { Pipe, PipeTransform } from '@angular/core';
import { Data } from './data';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
  transform(data: Data[], args: any[]) {
    if(args.length == 0)
      return data;
    return data.filter(data =>
    data.country.toLowerCase().includes(args.toString().toLowerCase())  ||
    data.capital.toLowerCase().includes(args.toString().toLowerCase()) ||
    data.weather.toLowerCase().includes(args.toString().toLowerCase()));
  }
}
