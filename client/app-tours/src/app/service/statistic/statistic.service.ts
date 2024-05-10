import { Injectable } from '@angular/core';
import {StatisticRestService} from "../rest/statistic-rest/statistic-rest.service";
import {map, Subject} from "rxjs";
import {ICustomStatisticUser} from "./model/icustom-statistic-user";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
    private rest: StatisticRestService
  ) { }

  getStatistic() {
    return this.rest.getStatistic().pipe(
      map((dt) => {
        return dt.map((su) => {
          return <ICustomStatisticUser>{
            city: su.address.city,
            company: su.company.name,
            name: su.name,
            phone: su.phone,
            street: su.address.street,
            id: su.id
          }
        })
      })
    )
  }
}
