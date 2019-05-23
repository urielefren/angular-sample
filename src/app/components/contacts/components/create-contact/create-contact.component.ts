import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { IContact, IContactFormResult } from '../../../../models/contact.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  id: number;
  contactForm: FormGroup;
  private _contactEdit: IContact;
  @Input() set contactEdit(value: IContact) {
    this._contactEdit = value;
    this.makeContactForm();
  }
  @Output() onSuccesCreatedContact = new EventEmitter<IContactFormResult>();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.makeContactForm();
  }

  private makeContactForm() {
    this.contactForm = this.formBuilder.group({
      name: [this.resolveContactData('name'), [Validators.required, this.validateName]],
      email: [this.resolveContactData('email'), [Validators.required]],
      message: [this.resolveContactData('message')]
    });

    if (this.isEditMode()) {
      this.contactForm.controls['name'].disable({
        onlySelf: true,
        emitEvent:false
      });
    }
  }

  private resolveContactData = (keyContact: string): string => {
    if (this._contactEdit) {
      return this._contactEdit[keyContact];
    }
    return '';
  };

  validateName(control: AbstractControl) {
    if (control) {
      return (/^[a-z0-9]+$/i.test(control.value)) ? null : { invalid: true }
    }
    return null;
  }

  isEditMode(): boolean {
    return this.resolveContactData('name') !== '';
  }

  onSubmit(event) {
    if (this.contactForm.valid) {
      const newContact: IContact = {
        name: this.contactForm.controls['name'].value,
        message: this.contactForm.controls['message'].value,
        email: this.contactForm.controls['email'].value
      }
      this.onSuccesCreatedContact.emit({
        contact: newContact,
        isEdit: this.isEditMode()
      });
    } else {
      alert('Form invalid');
    }
  }

}
