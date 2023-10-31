import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from '../services/common/common.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private commonService: CommonService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.commonService.isLoggedIn.pipe(
      map((loggedIn: boolean) => {
        if (loggedIn) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
