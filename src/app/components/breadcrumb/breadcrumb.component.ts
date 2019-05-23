import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  isLogged: boolean = true;
  private loginSubscription: Subscription;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginSubscription = this.loginService.loginAction.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    })
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
