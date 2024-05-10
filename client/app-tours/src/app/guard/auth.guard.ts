import {
  CanActivateFn,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, MaybeAsync, GuardResult
} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@tour/lib-auth"

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  console.log("authGuard")
  if(inject(AuthService).IsSingIn()) {
    console.log("authGuard return true")
    return true
  }
  // return false;
  console.log("authGuard redirect")
  return inject(Router).createUrlTree(['/auth/sign']);
}

