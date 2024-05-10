import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INearestTour} from "./model/inearest-tour";
import {delay, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NearestTourRestService {

  constructor(
    private http: HttpClient
  ) { }

  getNearestTour(idx: number) {

    if(idx < 1 || idx > 3) {
      idx = 1
    }

    return of("").pipe(
      delay(1000),
      switchMap(() => this.http.get<INearestTour>(`assets/mock/nearest-tour/nearestTours${idx}.json`)),
      delay(1000)
    )
  }
}
