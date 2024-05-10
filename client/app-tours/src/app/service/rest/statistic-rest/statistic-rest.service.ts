import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IStatisticUser} from "./model/istatistic-user";

@Injectable({
  providedIn: 'root'
})
export class StatisticRestService {
  constructor(
    private http: HttpClient
  ) { }

  getStatistic() {
    return this.http.get<IStatisticUser[]>("https://jsonplaceholder.typicode.com/users")
  }
}
