import { Injectable } from '@angular/core';
import {NearestTourRestService} from "../rest/nearest-tour-rest/nearest-tour-rest.service";

@Injectable({
  providedIn: 'root'
})
export class NearestTourService {

  constructor(
    private rest: NearestTourRestService
  ) { }


}
