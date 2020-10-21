import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/Authorisation/auth.service';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  mailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  validation_messages = {
    'username': [
      { type: 'required', message: this.language.validationText[0] },
      { type: 'minlength', message: this.language.validationText[1] },
      { type: 'maxlength', message: this.language.validationText[2] },
      { type: 'pattern', message: this.language.validationText[3] },
      { type: 'validUsername', message: this.language.validationText[4] }
    ],
    'email': [
      { type: 'required', message: this.language.validationText[5] },
      { type: 'pattern', message: this.language.validationText[6] }
    ],
    'confirm_password': [
      { type: 'required', message: this.language.validationText[7] },
      { type: 'areEqual', message: this.language.validationText[8] }
    ],
    'password': [
      { type: 'required', message: this.language.validationText[9] },
      { type: 'minlength', message: this.language.validationText[10] },
      { type: 'pattern', message: this.language.validationText[11] }
    ],
    'terms': [
      { type: 'pattern', message: this.language.validationText[12] }
    ]
  }

  constructor(private au: AuthService, private FB: FormBuilder, public language: LanguagesService) { }

  ngOnInit(): void {
    this.loginForm = this.FB.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.au.login(email, password);
  }

}
