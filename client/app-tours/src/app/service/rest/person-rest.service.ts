import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPerson} from "../../model/iperson";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonRestService {

  constructor(
      private http: HttpClient
  ) { }

  savePerson(psn: IPerson){
    console.log("savePerson", psn)
    // return this.http.get("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/")
    return this.http.post<IPerson>("http://ya.ru", psn)
  }
}
