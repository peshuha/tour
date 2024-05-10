import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IConfig} from "../../model/config";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private static config: IConfig | undefined
  private http: HttpClient | undefined

  constructor(
  ) {
    this.http = inject(HttpClient)
  }

  public Initialize(): Observable<IConfig> | undefined {
    const sbj = this.http?.get<IConfig>("/assets/config/config.json")
    sbj?.subscribe(
      (config) => {
        console.log("(config)", config)
        ConfigService.config = config
      },
      (error) => {console.error(error.message)}
    )
    return sbj
  }
  static ConfigInitialize(svc: ConfigService) {
    return ()  => svc.Initialize()
  }

  static get Config() {
    return ConfigService.config
  }
}
