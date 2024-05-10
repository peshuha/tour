import { Injectable } from '@angular/core';
import {IStorage} from "../../../class/istorage";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  implements IStorage{

  constructor() { }

  public getItem(key_: string): string | null {
    return localStorage.getItem(key_);
  }
  public setItem(key_: string, value: string): void {
    localStorage.setItem(key_, value)
  }
  removeItem(key_: string): void {
    localStorage.removeItem(key_)
  }
}
