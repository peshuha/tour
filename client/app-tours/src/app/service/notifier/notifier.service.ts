import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(
    private msgService: MessageService,
  ) { }

  Ok(title: string, body?: string): void {
    this.msgService.add({ severity: 'success', summary: title, detail: body})
  }

  Error(title: string, body?: string): void {
    this.msgService.add({ severity: 'error', summary: title, detail: body})
  }
}
