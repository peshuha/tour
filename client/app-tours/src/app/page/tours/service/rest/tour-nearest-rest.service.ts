import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITourNearest} from "../../../../model/itour-nearest";

@Injectable()
export class TourNearestRestService {

  constructor(
    private http: HttpClient
  ) { }

  getToursNearest() {
    return this.http.get<ITourNearest[]>("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/")
  }
}
