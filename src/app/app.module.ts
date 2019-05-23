import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './components/my-component/my-component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CreateContactComponent } from './components/contacts/components/create-contact/create-contact.component';
import { ConfirmContactComponent } from './components/contacts/components/confirm-contact/confirm-contact.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ContactsListComponent } from './components/contacts/components/contacts-list/contacts-list.component';
import { LoginComponent } from './components/login/login.component';

import { LoginGuardService } from './services/login-guard.service';
import { LoginService } from './services/login.service';

const routes: Routes = [
  { path: '', redirectTo:'/about', pathMatch: 'full' },
  { path: 'about', component: MyComponentComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [LoginGuardService],
    children: [
      { path: 'new', component: CreateContactComponent},
      { path: 'confirm-new-contact', component: ConfirmContactComponent },
      { path: ':contactId', component: CreateContactComponent },
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    ContactsComponent,
    CreateContactComponent,
    ConfirmContactComponent,
    BreadcrumbComponent,
    ContactsListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [LoginService, LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
