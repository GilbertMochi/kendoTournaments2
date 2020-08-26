import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Pool } from 'src/app/shared/interfaces/pool';
import { Participant } from 'src/app/shared/interfaces/participant';
import { DateTimeWithLocation } from 'src/app/shared/interfaces/date-time-with-location';
import { Match } from 'src/app/shared/interfaces/match';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchManagerService } from 'src/app/shared/services/match-manager.service';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-editable-pool',
  templateUrl: './editable-pool.component.html',
  styleUrls: ['./editable-pool.component.scss']
})
export class EditablePoolComponent implements OnInit {

  @Input() pool: Pool;
  @Input() tournamentId: string;
  @Input() participants: Participant[];
  @Input() dates: DateTimeWithLocation[];
  @Output() updatePool = new EventEmitter<Pool>();
  @Output() addedLocalMatch = new EventEmitter<Match>();

  isEdit: boolean = false;
  addNewMatch: boolean = false;
  matchesPanelOpen: boolean = false;
  poolPanelOpen: boolean = false;
  participantsPanelOpen: boolean = false;
  addedParticipantsPanelOpen: boolean = false;

  playerToAddToPool: Participant;

  localPool: Pool;
  matches: Match[] = [];
  matchesForThisPool: string[] = [];

  poolForm: FormGroup;
  newMatchForm: FormGroup;

  //two way bound values for match
  newMatchP1: Participant;
  newMatchP2: Participant;
  newMatchDate: string;
  newMatchLocation: string;
  newMatchTime: string;

  constructor(private matchManager: MatchManagerService, public language: LanguagesService, private FB: FormBuilder) { }

  ngOnInit(): void {
    //get all the matches for this pool from firebase
    this.matchManager.getMatches().subscribe(data => {
      this.matches = data.map(d => {
        const data = d.payload.doc.data() as Match;
        //if the match belongs to this tournament and pool
        if (data.tournamentId == this.tournamentId && data.poolId == this.pool.id) {
          data.id = d.payload.doc.id;
          console.log('added match' + data.id + ' from firestore to pool' + this.pool.id);
          this.matchesForThisPool.push(data.id);
          return data;
        }
      });
    });

    this.newMatchForm = this.FB.group({
      newMatchTime: ['', Validators.required],
      newMatchLocation: ['', Validators.required]
    });

    this.localPool = this.pool;
    this.initialisePoolForm();

    console.log(this.matchesForThisPool);
  }

  initialisePoolForm() {
    this.poolForm = this.FB.group({
      poolname: ['', Validators.required],
      poolId: ['', Validators.required],
    });

    this.poolForm.get('poolname').setValue(this.localPool.name);
    this.poolForm.get('poolId').setValue(this.localPool.id);
  }

  editPool() {
    this.isEdit = true;
    this.poolPanelOpen = true;
  }

  saveChanges() {
    this.getPoolValues();
    this.updatePool.emit(this.localPool);//changes back to parent
    this.isEdit = false;
    this.initialisePoolForm();
  }

  cancelChanges() {
    this.localPool = this.pool;
    this.isEdit = false;
    this.initialisePoolForm();
  }

  getPoolValues() {
    this.localPool.name = this.poolForm.get('poolname').value;
    this.localPool.id = this.poolForm.get('poolId').value;
  }

  canSubmit(): boolean {
    if (this.poolForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  resetMatchForm() {
    this.newMatchForm.reset();
    this.newMatchP1 = null;
    this.newMatchP2 = null;
    this.newMatchDate = '';
    this.newMatchTime = '';
  }

  getNewMatchValuesFromForm(event: any) {
    this.newMatchLocation = this.newMatchForm.get('newMatchLocation').value;
    this.newMatchTime = this.newMatchForm.get('newMatchTime').value;
  }

  updateMatch(m: Match) {
    this.matchManager.updateMatch(m)
  }

  deleteMatch(i) {

  }

  addLocalMatch() {
    const m: Match = {
      tournamentId: this.tournamentId,
      poolId: this.pool.id,
      participant1: this.newMatchP1,
      participant2: this.newMatchP2,
      location: this.newMatchLocation,
      dateAsIsoString: this.newMatchDate,
      time: this.newMatchTime,
      p1Score: null,
      p2Score: null,
      matchStarted: false,
      matchOver: false,
    };
    this.addedLocalMatch.emit(m);//local match back to editable tournament
    this.resetMatchForm();
  }

  canAddMatch(): boolean {
    if (this.newMatchDate != null && this.newMatchDate != '') {
      if (this.newMatchLocation != null && this.newMatchLocation != '') {
        if (this.newMatchP1 != null && this.newMatchP2 != null) {
          if (this.newMatchTime != null && this.newMatchTime != '') {
            return true;
          }
        }
      }
    }
    else {
      return false;
    }
  }

  addParticipant() {
    //check if particpant has already been added
    //if not add else don't
    if (!this.localPool.participants.includes(this.playerToAddToPool, 0)) {
      this.localPool.participants.push(this.playerToAddToPool);
    }
  }

  removeParticipant(i) {
    this.localPool.participants.splice(i, 1);
  }

  removeWinner() {
    this.localPool.winner = null;
  }

  removeSecond() {
    this.localPool.second = null;
  }

  //this is from here https://stackoverflow.com/questions/46127159/unable-to-assign-form-control-to-template-variable-in-reactive-forms-angular
  validateFormControl(controlName: string, form: FormGroup) {
    let control = form.get(controlName);
    return control.invalid && control.touched;
  }
}

// <app-new-match [addNewMatch]="this.addNewMatch" [tournamentId]="this.tournamentId" [poolId]="this.pool.id"
//             [participants]="this.participants" [dates]="this.dates" (addMatch)='addMatch($event);'>
//         </app-new-match>

// <div class="formBlock" *ngFor="let item of this.matches; let i = index">
//                 <app-editable-match [match]="item" [tournamentId]="this.tournamentId" [poolId]="this.pool.id"
//                     [participants]="this.participants" [dates]="this.dates" (updateMatch)='updateMatch($event);'
//                     (deleteMatch)='deleteMatch(i);'>
//                 </app-editable-match>
//             </div>
