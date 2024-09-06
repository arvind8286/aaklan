import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country',
  standalone: true
})
export class CountryPipe implements PipeTransform {

  transform(data: any[], valueField: string, labelField: string): any[] {
    return data.map(item => ({ value: item[valueField], label: item[labelField] }));}

}
