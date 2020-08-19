import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { TournamentManagerService } from 'src/app/shared/services/tournament-manager.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { DateTimeWithLocation } from 'src/app/shared/interfaces/date-time-with-location';
import { Participant } from 'src/app/shared/interfaces/participant';
import { Pool } from 'src/app/shared/interfaces/pool';
import { iMatchInfoItem } from 'src/app/shared/interfaces/matchInfoItem';
import { Tournament } from 'src/app/shared/interfaces/tournament';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.scss']
})
export class NewTournamentComponent implements OnInit {

  tournamentName: string;
  address: string;
  date: Date;
  firstname: string;
  lastname: string;
  rank: string;
  poolname: string;
  poolId: string;

  datesWithLocations: DateTimeWithLocation[] = [];
  participants: Participant[] = [];
  pools: Pool[] = [];
  upcomingMatches: iMatchInfoItem[] = [];
  pastMatches: iMatchInfoItem[] = [];

  tournamentForm: FormGroup;

  canSubmit: boolean = false;

  constructor(private router: Router, private tournamentService: TournamentManagerService, public language: LanguagesService, private FB: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initializeValues();
    this.tournamentForm = this.FB.group({
      name: ['', Validators.required],
      address: [''],
      date: [this.FB.control(new Date())],
      firstname: [''],
      lastname: [''],
      rank: [''],
      poolname: [''],
      poolId: [''],
      // matches: this.FB.group({

      // }),
    });
  }

  initializeValues() {
    tournamentName: '';
    address: '';
    date: new Date();
    firstname: '';
    lastname: '';
    rank: '';
    poolname: '';
    poolId: '';

    datesWithLocations: [];
    participants: [];
    pools: [];
  }

  setTournamentName(event: any) {
    this.tournamentName = this.tournamentForm.get('name').value;
  }

  setAddress(event: any) {
    this.address = this.tournamentForm.get('address').value;
  }

  canAddDate(): boolean {
    if ((this.address != '' && this.address != null) && (this.date != null && this.date.getDate.toString() != '')) {
      return true;
    } else {
      return false;
    }
  }

  setParticipantFirstname(event: any) {
    this.firstname = this.tournamentForm.get('firstname').value;
  }

  setParticipantLastname(event: any) {
    this.lastname = this.tournamentForm.get('lastname').value;
  }

  setParticipantRank(event: any) {
    this.rank = this.tournamentForm.get('rank').value;
  }

  canAddParticipant(): boolean {
    if ((this.firstname != '' && this.firstname != null) &&
      (this.lastname != null && this.lastname != '') &&
      (this.rank != null && this.rank != '')) {
      return true;
    }
    else {
      return false;
    }
  }

  canAddPool(): boolean {
    if (this.poolname != '' && this.poolname != null && this.poolId != null && this.poolId != '') {
      return true;
    } else {
      return false;
    }
  }

  setPoolName(event: any) {
    this.poolname = this.tournamentForm.get('poolname').value;
  }

  setPoolId(event: any) {
    this.poolId = this.tournamentForm.get('poolId').value;
  }

  submitNewTournament() {
    const newTournament: Tournament = {
      name: this.tournamentName,
      id: '',
      dates: this.datesWithLocations,
      participants: this.participants,
      pools: this.pools,
      tournamentStarted: false,
      tournamentOver: false,
    };

    if (newTournament != null) {
      this.tournamentService.createTournament(newTournament);
    }
    this.allNeededValuesOk();
    this.tournamentForm.reset();
    this.resetLocalValues();
    this.openSnackBar(this.language.miscellanousText[20], this.language.miscellanousText[6]);
  }

  addDate() {
    if (this.address !== '' && this.address !== null && this.date !== null && this.date.toString() != '') {
      this.datesWithLocations.push({ dateAsString: this.date.toISOString(), location: this.address });
    }

    //reset fields
    this.resetFormControl('address');
    this.resetFormControl('date');

    this.allNeededValuesOk();
  }

  deleteDateWithLocation(i) {
    this.datesWithLocations.splice(i, 1);
  }

  addParticipant() {
    if (this.firstname != '' && this.lastname != '' && this.rank != '') {
      this.participants.push({
        firstname: this.firstname,
        lastname: this.lastname,
        id: '',
        rank: this.rank,
        wins: 0,
        losses: 0
      });
    }
    this.resetFormControl('firstname');
    this.resetFormControl('lastname');
    this.resetFormControl('rank');
    this.allNeededValuesOk();
  }

  deleteParticipant(i) {
    this.participants.splice(i, 1);
  }

  addPool() {
    if (this.poolname != '' && this.poolname != null && this.poolId != null && this.poolId != '') {

      this.pools.push({
        name: this.poolname,
        id: this.poolId,
        matchesInfo: [],
        participants: [],
        winner: null,
        second: null
      });
    }
    this.resetFormControl('poolname');
    this.resetFormControl('poolId');
    this.allNeededValuesOk();
  }

  deletePool(i) {
    this.pools.splice(i, 1);
  }

  logKeyValuePairs(group: FormGroup): void {
    //get each key in the formgroup
    Object.keys(group.controls).forEach((key: string) => {
      //returns a form control or a nested form group, both inherit from the abstract control class
      const abstractControl = group.get(key);
      //check if the returned abstract control is a control or a nested group
      if (abstractControl instanceof FormGroup) {
        //call this function recursively to log key values from nested groups
        this.logKeyValuePairs(abstractControl);

      } else {
        //if the abstractControl is a control write it to console
        console.log("Key: " + key + ", value: " + abstractControl.value + ".");
      }
    })
  }

  //this is from here https://stackoverflow.com/questions/46127159/unable-to-assign-form-control-to-template-variable-in-reactive-forms-angular
  validateFormControl(controlName: string) {
    let control = this.tournamentForm.get(controlName);
    return control.invalid && control.touched;
  }

  resetFormControl(controlName: string) {
    this.tournamentForm.get(controlName).reset();
  }

  resetLocalValues() {
    this.tournamentName = '';
    this.address = '';
    this.date = null;
    this.firstname = '';
    this.lastname = '';
    this.rank = '';
    this.poolname = '';
    this.poolId = '';

    this.datesWithLocations = [];
    this.participants = [];
    this.pools = [];
    this.upcomingMatches = [];
    this.pastMatches = [];

  }

  allNeededValuesOk() {
    this.canSubmit = false;

    if (this.tournamentName != null || this.tournamentName != '') {
      if (this.datesWithLocations.length > 0) {
        if (this.participants.length > 0) {
          if (this.pools.length > 0) {
            this.canSubmit = true;
          }
        }
      }
    }
  }

  closeTournamentForm() {
    this.resetLocalValues();
    this.router.navigate(['/dashboard']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
