import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value: any, searchfilter: any): any {
    if (!searchfilter) {
      return value;
    }
    searchfilter = searchfilter.toLowerCase();
    return value.filter((e: any) => {
      return (
        e.statutReclamation.toLowerCase().indexOf(searchfilter) > -1 ||
        e.email.toLowerCase().indexOf(searchfilter) > -1
      );
    });
  }

}
