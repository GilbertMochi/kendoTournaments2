import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from 'src/app/shared/interfaces/tournament';
import { Participant } from 'src/app/shared/interfaces/participant';
import { Pool } from 'src/app/shared/interfaces/pool';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentManagerService } from 'src/app/shared/services/tournament-manager.service';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Match } from 'src/app/shared/interfaces/match';
import { MatchManagerService } from 'src/app/shared/services/match-manager.service';

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

  localMatches: Match[] = [];

  constructor(private router: Router,
    private tournamentService: TournamentManagerService,
    public language: LanguagesService,
    private matchManager: MatchManagerService,
    private FB: FormBuilder,
    private _snackBar: MatSnackBar) { }

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
      poolId: [''],
    });
    this.resetTournamentForm();
  }

  resetTournamentForm() {
    this.tournamentForm.reset();
    this.tournamentForm.get('tournamentname').setValue(this.tournament.name);
  }

  saveChanges() {
    this.addMatches();
    this.tournamentService.updateTournament(this.localTournament);
    this.isEdit = false;
    this.resetTournamentForm();
    this.openSnackBar(this.language.miscellanousText[23], this.language.miscellanousText[6]);
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
    });
    //after adding the pool empty the text boxes
    this.tournamentForm.get('poolname').reset();
    this.tournamentForm.get('poolId').reset();
  }

  deletePool(i) {
    //delete all of this pool's matches as well
    console.warn('remember to delete the matches for this pool as well!');
    this.localTournament.pools.splice(i, 1);
  }

  updatePool(p: Pool, i) {
    this.localTournament.pools[i] = p;
  }

  addedLocalMatch(m: Match) {
    this.localMatches.push(m);
  }

  async addMatches() {
    //loop through all pools
    for (let i = 0; i < this.localTournament.pools.length; i++) {
      //loop through all local matches
      for (let j = 0; j < this.localMatches.length; j++) {
        //check which pool the match belongs to and add the match info to the pools match info array
        if (this.localTournament.pools[i].id == this.localMatches[j].poolId) {

          this.matchManager.createMatch(this.localMatches[j]);

          //this works but the tournament is updated faster than the id's are added to the local pool
          // this.firestore.collection('Matches').add(this.localMatches[j]).then(docRef => {
          //   this.localTournament.pools[i].matchesInfo.push(docRef.id);
          // }).catch(e => console.error('Error adding a new match to firebase', e));

          // let result = await this.matchManager.AddNewMatch(this.localMatches[j]);
          // this.localTournament.pools[i].matchesInfo.push({ id: result.id, location: this.localMatches[j].location, dateAsIsoString: this.localMatches[j].dateAsIsoString, time: this.localMatches[j].time });

          //add the match to firebase and get the matchesId
          // const matchId = this.matchManager.AddNewMatch(this.localMatches[j]);
          // console.log('matchId:' + matchId);
          // this.localTournament.pools[i].matchesInfo.push({ id: matchId, location: this.localMatches[j].location, dateAsIsoString: this.localMatches[j].dateAsIsoString, time: this.localMatches[j].time });
        }
      }
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}

//cancel changes btn
/*
<button mat-raised-button color="warn" class="add" (click)="cancelEdit()">
{{this.language.miscellanousText[2]}}
<mat-icon>cancel</mat-icon>
</button>
*/
