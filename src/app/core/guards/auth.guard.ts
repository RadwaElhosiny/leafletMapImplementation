import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  private checkUserAuth(state: RouterStateSnapshot, route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (localStorage.getItem('rememberMe') == 'true') {
        if (localStorage.getItem('access-token')) {
          resolve(true)
        }
        else {
          resolve(false);
          this.router.navigate(['/login']);
        }
      }
      else {
        if (sessionStorage.getItem('access-token')) {
          resolve(true)
        }
        else {
          resolve(false);
          this.router.navigate(['/login']);
        }
      }
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserAuth(state, route);
  }
  
}
