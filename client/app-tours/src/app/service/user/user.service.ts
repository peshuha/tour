import { Injectable } from '@angular/core';
import {AuthService} from "@tour/lib-auth";
import {IUser} from "../../model/iuser";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private auth: AuthService,
  ) {
  }

  getUser() {
    return {
      login:  this.auth.GetLogin() || ""
    }
  }

  public GetToken() {
    return this.auth.GetToken()
  }
}
