import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private authService: AuthService,
    private router: Router
) {

}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //throw new Error("Method not implemented.");
    //return false;
    if(this.authService.isLoggedIn()) {
        return this.authService.isLoggedIn();
    }
    else {
        if(sessionStorage.getItem('access-token')) {
            this.authService.setLoggedInStatus(true);
            return true;
        }
        else {
            this.router.navigate(['login']);
            return false;
        }
    }
}

canDeactivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean {
    if(this.authService.isLoggedIn() || state['routeConfig'].path=='register' || state['routeConfig'].path=='login' ) {
        return true
    }
    else {
        return false;
    }
}
}
