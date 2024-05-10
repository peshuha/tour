import {importProvidersFrom, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITour} from "../../../../model/itour";

@Injectable(
)
export class TourRestService {

  constructor(
    private http: HttpClient
  ) { }

  getTours() : Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/', {
      headers: {
        "Test": "Hello"
      }
    })
  }

  testError() : Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/helloError', {
      headers: {
        "Mine": "Error"
      }
    })
  }
}
