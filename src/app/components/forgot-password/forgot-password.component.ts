import { NotificationService } from './../../services/notification.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup;
  public email = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService) {
    this.form = formBuilder.group({ 'email': this.email });
  }

  ngOnInit() { }

  reset(): void {
    if (!this.email) {
      this.notification.notify('Email is required');
      return;
    }

    this.notification.notify('Ops... Not Implemented!');
  }
}
