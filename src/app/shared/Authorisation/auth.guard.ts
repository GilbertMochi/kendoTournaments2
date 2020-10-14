import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.auth.user;
    if (user) {
      //is route restricted by user role?
      if (route.data.roles && !route.data.roles.Includes(user.role) {
        //role wasn't authorised do throw them back to dashboard
        this.router.navigate(['/dashboard']);
        return false;
      }
      //user is authorised so return true
      return true;
    }

    //not logged in redirect to home
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
