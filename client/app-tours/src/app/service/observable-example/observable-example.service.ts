import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {

  private subj = new Subject<string>
  constructor() { }

  getSubject() {
    return this.subj
  }
}
