import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from "../service/user/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private svcUser: UserService
  ) {
    console.log("AuthInterceptor::constructor")
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let req = request
    const token = this.svcUser.GetToken()
    // console.log("AuthInterceptor::intercept", token, request.url, request.headers.keys())

    if(!!token) {

      req = request.clone({
        headers: req.headers.append("Authorize", `Bearer ${token}`)
      })


    }
    return next.handle(req);
  }
}
