import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmContactComponent } from './components/confirm-contact/confirm-contact.component';
import { IContact, IContactFormResult } from '../../models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  currentNewContact: IContact;
  contacts: Array<IContact> = [{
    name: 'uriel',
    message: 'GOT final sucks!!!',
    email: 'ur@ur.com'
  }];
  private newContactSubscription: Subscription;
  private isEditMode: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.newContactSubscription) {
      this.newContactSubscription.unsubscribe();
      this.newContactSubscription = null;
    }
  }

  addContact() {
    this.isEditMode = false;
    this.router.navigate(['/contacts/new'], {relativeTo: this.route});
  }

  editContact(contact: IContact) {
    console.log('contact to edit: ', contact);
    this.isEditMode = true;
    this.currentNewContact = contact;
    this.router.navigate(['/contacts/', contact.name], { relativeTo: this.route });
  }

  onRouterOutletActivate(component) {
    if (component instanceof CreateContactComponent) {
      const createContactComponent: CreateContactComponent = component;
      if (this.isEditMode) {
        createContactComponent.contactEdit = this.currentNewContact;
      }
      this.newContactSubscription = createContactComponent.onSuccesCreatedContact.subscribe((newContact: IContactFormResult) => {
        this.currentNewContact = newContact.contact;
        this.isEditMode = newContact.isEdit;
        if (!this.isEditMode) {
          this.router.navigate(['/contacts/confirm-new-contact'], {relativeTo: this.route });
        } else {
          const realContact = this.contacts.find((contact: IContact) => {
            return contact.name === this.currentNewContact.name;
          });
          realContact.name = this.currentNewContact.name;
          realContact.message = this.currentNewContact.message;
          realContact.email = this.currentNewContact.email;
        }
      });
    }

    if (component instanceof ConfirmContactComponent) {
      const confirmContactComponent: ConfirmContactComponent = component;
      if (this.currentNewContact) {
        this.contacts.push(this.currentNewContact);
        confirmContactComponent.emailResult = this.currentNewContact.email;
      }
    }
  }

}
