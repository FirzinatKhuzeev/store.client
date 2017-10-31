import { NotificationService } from './../../services/notification.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public firstName = new FormControl('', Validators.required);
  public lastName = new FormControl('', Validators.required);
  public email = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);
  public confirmPassword = new FormControl('', Validators.required);
  public accept = new FormControl('', Validators.required);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NotificationService
  ) {
    this.form = formBuilder.group({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
      'password': this.password,
      'confirmPassword': this.confirmPassword,
      'accept': this.accept
    });
  }

  ngOnInit() {
  }

  public register(): void {
    this.userService.create(this.form.value)
      .subscribe(
      date => {
        this.router.navigate(['/login']);
      },
      error => {
        this.notification.notify(error.message);
        console.error(error);
      });
  }
}
