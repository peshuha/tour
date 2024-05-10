import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITourLocation} from "../../../../model/itour-location";

@Injectable()
export class TourLocationRestService {

  constructor(
    private http: HttpClient
  ) { }

  getTourLocation() {
    return this.http.get<ITourLocation[]>("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/")
  }
}
