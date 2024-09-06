import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state',
  standalone: true
})
export class StatePipe implements PipeTransform {

  transform(data: any[], valueField: string, labelField: string): any[] {
    return data.map(item => ({ value: item[valueField], label: item[labelField] }));}

}
