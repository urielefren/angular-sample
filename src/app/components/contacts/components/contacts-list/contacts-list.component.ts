import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from '../../../../models/contact.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  @Input() contacts: Array<IContact> = [];
  @Output() emitEditContact = new EventEmitter<IContact>();

  constructor() { }

  ngOnInit() {
  }

  editContact(contact: IContact) {
    this.emitEditContact.emit(contact);
  }

}
