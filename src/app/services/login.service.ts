import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/login.model';

@Injectable()
export class LoginService {

    private loginSubject = new BehaviorSubject<boolean>(false);
    public loginAction = this.loginSubject.asObservable();
    constructor() { }

    updateLoginState(isLogin: boolean) {
        this.loginSubject.next(isLogin);
    }

}
