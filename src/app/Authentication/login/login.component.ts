import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/Authorisation/auth.service';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private au: AuthService, private FB: FormBuilder, public language: LanguagesService, public validation: ValidationService) { }

  ngOnInit(): void {
    this.loginForm = this.FB.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.au.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
  }

}
