import { Component, NgModuleFactoryLoader, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { AuthService } from 'src/app/shared/Authorisation/auth.service';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  mail: FormGroup;
  mailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  sent: boolean = false;

  mailError: string;

  private users: User[] = [];

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

  constructor(private router: Router, private au: AuthService, private FB: FormBuilder, public language: LanguagesService) { }

  ngOnInit(): void {
    this.sent = false;
    this.mail = this.FB.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.mailPattern)]),
    });
  }

  get email() {
    return this.mail.get('email');
  }

  forgotPW() {
    if (this.mail.valid) {
      if (this.checkIfMailExists()) {
        this.au.sendPasswordResetEmail(this.email.value);
        this.mail.reset();
        this.sent = true;
      }
    }
  }

  checkIfMailExists(): boolean {
    this.users.forEach(e => {
      if (e.email === this.mail.value) {
        this.mailError = null;
        return true;
      }
    });
    this.mailError = this.language.authorisationText[11];
    return false;
  }

  mailDoesNot(): boolean {
    if (this.mailError == null) {
      return false;
    }
    return true;
  }
}
