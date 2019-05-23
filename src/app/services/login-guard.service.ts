import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { IUser } from '../models/login.model';

@Injectable()
export class LoginGuardService implements CanActivate {
    
    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loginService.loginAction.map(value => {
            if (!value) {
                this.router.navigate(['/login']);
            }
            return value;
        });
    }
}
