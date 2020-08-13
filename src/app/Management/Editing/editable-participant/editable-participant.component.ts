import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Participant } from 'src/app/shared/interfaces/participant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-editable-participant',
  templateUrl: './editable-participant.component.html',
  styleUrls: ['./editable-participant.component.scss']
})
export class EditableParticipantComponent implements OnInit {
  @Input() participant: Participant;
  @Output() updateParticipant = new EventEmitter<Participant>();
  @Output() deleteParticipant = new EventEmitter<Participant>();
  isEdit: boolean = false;

  localParticipant: Participant;
  participantForm: FormGroup;

  constructor(public language: LanguagesService, private FB: FormBuilder) { }

  ngOnInit(): void {
    this.localParticipant = this.participant;

    this.participantForm = this.FB.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      rank: ['', Validators.required],
      wins: ['', Validators.required],
      losses: ['', Validators.required]
    });

    this.setFormValues();
  }

  setFormValues() {
    this.participantForm.get('firstname').setValue(this.localParticipant.firstname);
    this.participantForm.get('lastname').setValue(this.localParticipant.lastname);
    this.participantForm.get('rank').setValue(this.localParticipant.rank);
    this.participantForm.get('wins').setValue(this.localParticipant.wins);
    this.participantForm.get('losses').setValue(this.localParticipant.losses);
  }

  saveChanges() {//save the locally edited participant to participant
    this.getParticipantValues();
    this.updateParticipant.emit(this.localParticipant);
    this.isEdit = false;
    this.participantForm.reset();
    this.setFormValues();
  }

  cancelChanges() {//override local participant with the input participant to discard changes
    this.localParticipant = this.participant;
    this.isEdit = false;
    this.participantForm.reset();
    this.setFormValues();
  }

  deleteThisParticipant() {
    this.deleteParticipant.emit(this.localParticipant);
  }

  canSubmit(): boolean {
    if (this.participantForm.valid) {
      if (this.localParticipant.firstname != null && this.localParticipant.firstname != '') {
        if (this.localParticipant.lastname != null && this.localParticipant.lastname != '') {
          if (this.localParticipant.rank != null && this.localParticipant.rank != '') {
            return true;
          }
        }
      }
    }
    else {
      return false;
    }
  }

  getParticipantValues() {
    console.log('getting values');
    this.localParticipant.firstname = this.participantForm.get('firstname').value;
    this.localParticipant.lastname = this.participantForm.get('lastname').value;
    this.localParticipant.rank = this.participantForm.get('rank').value;
    this.localParticipant.wins = this.participantForm.get('wins').value;
    this.localParticipant.losses = this.participantForm.get('losses').value;
  }

}
