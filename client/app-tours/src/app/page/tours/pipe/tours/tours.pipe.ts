import { Pipe, PipeTransform } from '@angular/core';
import {ITour} from "../../../../model/itour";

@Pipe({
  name: 'tours'
})
export class ToursPipe implements PipeTransform {

  transform(items: ITour[] | undefined, search: string | undefined | null): ITour[] | undefined {
    console.log("transform", search)
    if(!items || !search || search.length <= 3) {
      return items
    }
    return items.filter(item => item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
  }

}
