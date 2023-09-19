import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(JSON.parse(sessionStorage.getItem('user_id'))!==null && sessionStorage.getItem('user_name') != null){
        // if(JSON.parse(sessionStorage.getItem('data'))['token'].length>1)
      return true;
      }
      else{
        this.router.navigate(['']);
        return false;
      }
  }
  
}
