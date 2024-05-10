import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable()
export class SearchStringService {

  private search: ReplaySubject<string> = new ReplaySubject<string>();
  constructor() { }

  public setSearch(search: string) {
    console.log("setSearch(search: string)", search)
    this.search.next(search);
  }

  public getSearch(): Observable<string> {
    return this.search.asObservable()
  }
}
