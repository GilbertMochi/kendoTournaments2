import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/Authorisation/auth.service';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private au: AuthService, private FB: FormBuilder, public language: LanguagesService) { }

  ngOnInit(): void {
    this.loginForm = this.FB.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {

  }

  setUsername($event) {

  }

  setPassword($event) {

  }

}
