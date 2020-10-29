import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/Authorisation/auth.service';
import { Role } from 'src/app/shared/interfaces/roles';
import { User } from 'src/app/shared/interfaces/user';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  authError: any;

  roles: string[] = [this.language.rolesText[0], this.language.rolesText[1]];
  userRole: string;

  newUser: User;

  constructor(private au: AuthService, private FB: FormBuilder, public language: LanguagesService, public val: ValidationService) { }

  ngOnInit(): void {
    this.au.eventAuthError$.subscribe(data => { this.authError = data });

    this.registerForm = this.FB.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.val.mailPattern)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  register() {
    this.newUser = {
      email: this.registerForm.get('email').value,
      uid: "",
      role: this.getUserRole()
    };

    this.au.register(this.newUser.email, this.registerForm.get('password').value, this.newUser);
  }

  getUserRole(): Role {
    if (this.userRole == this.language.rolesText[0]) {
      return {
        admin: false,
        organiser: true,
        referee: true
      };
    } else {
      return {
        admin: false,
        organiser: false,
        referee: true
      };
    }
  }

}
