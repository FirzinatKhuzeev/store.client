import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public email = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      'email': this.email,
      'password': this.password
    });
  }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

  login(): void {
    this.authenticationService.login(this.form.value.email, this.form.value.password);
  }
}
