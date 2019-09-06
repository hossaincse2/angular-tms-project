import { AuthGuardService } from './auth.guard.service';
import { Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authGuardService: AuthGuardService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authGuardService.isLoggedIn
      .take(1)
      .map((isLoggedIn: boolean) => {
        if (!isLoggedIn){
          //alert(isLoggedIn);
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      });
  }
}
