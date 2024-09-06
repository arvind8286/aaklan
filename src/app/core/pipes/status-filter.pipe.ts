import { Pipe, PipeTransform } from '@angular/core';
import { sector } from '../models/API.Models';

@Pipe({
  name: 'statusFilter',
  standalone: true
})
export class StatusFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

   // searchText = searchTex();
    return items.filter(item => {
      return item.status.includes(searchText);
    });
  }

}
