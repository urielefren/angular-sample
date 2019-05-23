import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-contact',
  templateUrl: './confirm-contact.component.html',
  styleUrls: ['./confirm-contact.component.css']
})
export class ConfirmContactComponent implements OnInit {

  private _emailResult: string = '';

  @Input() set emailResult(value: string) {
    this._emailResult = value;
  }

  constructor() { }

  ngOnInit() {
  }

}
