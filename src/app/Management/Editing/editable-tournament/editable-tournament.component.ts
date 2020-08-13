import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from 'src/app/shared/interfaces/tournament';
import { DateTimeWithLocation } from 'src/app/shared/interfaces/date-time-with-location';
import { Participant } from 'src/app/shared/interfaces/participant';
import { Pool } from 'src/app/shared/interfaces/pool';
import { iMatchInfoItem } from 'src/app/shared/interfaces/matchInfoItem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentManagerService } from 'src/app/shared/services/tournament-manager.service';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Match } from 'src/app/shared/interfaces/match';

@Component({
  selector: 'app-editable-tournament',
  templateUrl: './editable-tournament.component.html',
  styleUrls: ['./editable-tournament.component.scss']
})
export class EditableTournamentComponent implements OnInit {

  @Input() tournament: Tournament;
  isEdit: boolean = false;

  participantsPanelOpen: boolean = false;
  poolsPanelOpen: boolean = false;

  tournamentForm: FormGroup;
  localTournament: Tournament;

  constructor(private router: Router, private tournamentService: TournamentManagerService, public language: LanguagesService, private FB: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.localTournament = this.tournament;

    this.tournamentForm = this.FB.group({
      tournamentname: ['', Validators.required],
      address: [''],
      date: [this.FB.control(new Date())],
      firstname: [''],
      lastname: [''],
      rank: [''],
      poolname: [''],
    });
    console.log('local dates length:' + this.localTournament.dates.length);
    this.resetTournamentForm();
  }

  resetTournamentForm() {
    console.log('resetting form');
    this.tournamentForm.reset();
    this.tournamentForm.get('tournamentname').setValue(this.tournament.name);
  }

  saveChanges() {
    this.tournamentService.updateTournament(this.localTournament);
    this.isEdit = false;
    this.resetTournamentForm();
  }

  cancelEdit() {
    this.localTournament = this.tournament;
    this.resetTournamentForm();
    this.isEdit = false;
  }

  canSubmit(): boolean {
    if (this.localTournament.name != null && this.localTournament.name != '') {
      if (this.localTournament.id != null && this.localTournament.id != '') {
        if (this.localTournament.dates != null && this.localTournament.dates.length > 0) {
          if (this.localTournament.participants != null && this.localTournament.participants.length > 0) {
            if (this.localTournament.pools != null && this.localTournament.pools.length > 0) {
              return true;
            }
          }
        }
      }
    } else {
      return false;
    }
  }

  deleteTournament(id: string) {
    if (id != null) {
      this.tournamentService.deleteTournament(id);
    }
    this.openSnackBar(this.language.miscellanousText[5], this.language.miscellanousText[6]);
  }

  getTournamentName() {
    this.localTournament.name = this.tournamentForm.get('tournamentname').value;
  }

  deleteDateWithLocation(i) {
    this.localTournament.dates.splice(i, 1);
  }

  canAddDate(): boolean {
    const a = this.tournamentForm.get('address').value;

    if (a != '' && a != null) {
      if (!this.tournamentForm.get('date').invalid) {
        return true;
      }
    } else {
      return false;
    }
  }

  addDate() {
    const a = this.tournamentForm.get('address').value;
    const d: Date = this.tournamentForm.get('date').value;
    this.localTournament.dates.push({ dateAsString: d.toISOString(), location: a });
  }

  canAddParticipant(): boolean {
    //if first name is proper
    if (!this.tournamentForm.get('firstname').invalid && this.tournamentForm.get('firstname').value != '') {
      //last name is proper
      if (!this.tournamentForm.get('lastname').invalid && this.tournamentForm.get('lastname').value != '') {
        //rank is also proper
        if (!this.tournamentForm.get('lastname').invalid && this.tournamentForm.get('rank').value != '') {
          return true;
        }
      }
    }
    else {
      return false;
    }
  }

  addParticipant() {
    //get user input
    const f = this.tournamentForm.get('firstname').value;
    const l = this.tournamentForm.get('lastname').value;
    const r = this.tournamentForm.get('rank').value;

    //add new participant only locally, saving the changes in the form pushed the changes to firebase
    this.localTournament.participants.push({ firstname: f, lastname: l, rank: r, wins: 0, losses: 0 });

    //after adding the participant empty the text boxes
    this.tournamentForm.get('firstname').reset();
    this.tournamentForm.get('lastname').reset();
    this.tournamentForm.get('rank').reset();
  }

  deleteParticipant($event, i) {
    this.localTournament.participants.splice(i, 1);
  }

  updateParticipant(p: Participant, i) {
    //set participant at place i to given participant p
    this.localTournament.participants[i] = p;
  }

  canAddPool(): boolean {
    if (!this.tournamentForm.get('poolname').invalid && this.tournamentForm.get('poolname').value != '') {
      if (!this.tournamentForm.get('poolId').invalid && this.tournamentForm.get('poolId').value != '') {
        return true;
      }
    } else {
      return false;
    }
  }

  addPool() {
    //get user input
    const poolname = this.tournamentForm.get('poolname').value;
    const poolid = this.tournamentForm.get('poolId').value;

    //add new pool only locally, saving the changes in the form pushed the changes to firebase
    this.localTournament.pools.push({
      name: poolname,
      id: poolid,
      matchesInfo: [],
      participants: [],
      winner: null,
      second: null
    });
    //after adding the pool empty the text boxes
    this.tournamentForm.get('poolname').reset();
    this.tournamentForm.get('poolId').reset();
  }

  deletePool(i) {
    this.localTournament.pools.splice(i, 1);
  }

  updatePool(p: Pool, i) {
    this.localTournament.pools[i] = p;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}

// <!--Pools-->
// <div class="formBlock">
//     <h2>{{this.language.poolsText[0]}}</h2>
//     <mat-accordion>
//         <mat-expansion-panel (opened)="poolsPanelOpen = true" (closed)="poolsPanelOpen = false">
//             <mat-expansion-panel-header>
//                 <mat-panel-title>
//                     {{this.language.poolsText[5]}}
//                 </mat-panel-title>
//                 <mat-panel-description>
//                 </mat-panel-description>
//             </mat-expansion-panel-header>
//             <div class="participantItem"
//                 *ngFor="let item of this.localTournament.pools; let i = index">
//                 <app-editable-pool [pool]="item" [tournamentId]="this.tournament.id"
//                     [participants]="this.localTournament.participants"
//                     [dates]="this.localTournament.dates" (updatePool)='updatePool($event, i);'>
//                 </app-editable-pool>
//                 <button mat-stroked-button color="warn" class="deleteItemBtn"
//                     (click)="deletePool(i)">
//                     {{this.language.miscellanousText[4]}}
//                     <mat-icon>delete</mat-icon>
//                 </button>
//             </div>
//         </mat-expansion-panel>
//     </mat-accordion>

//     <h3>{{this.language.poolsText[1]}}</h3>

//     <mat-form-field appearance="fill">
//         <!--pool name-->
//         <mat-label>{{this.language.poolsText[2]}}</mat-label>
//         <input matInput placeholder="{{this.language.poolsText[3]}}" formControlName="poolname">
//     </mat-form-field>

//     <button mat-icon-button color="primary" [disabled]="!canAddPool()" (click)="addPool()">
//         <mat-icon>add_circle</mat-icon>
//     </button>
// </div>
