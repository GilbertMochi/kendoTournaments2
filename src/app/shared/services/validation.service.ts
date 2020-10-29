import { Injectable } from '@angular/core';
import { LanguagesService } from './languages.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public mailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  public validation_messages = {
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

  constructor(private language:LanguagesService) { }
}
