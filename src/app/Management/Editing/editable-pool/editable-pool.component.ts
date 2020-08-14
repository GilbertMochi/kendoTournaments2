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
  isEdit: boolean = false;
  addNewMatch: boolean = false;
  matchesPanelOpen: boolean = false;
  poolPanelOpen: boolean = false;
  participantsPanelOpen: boolean = false;
  addedParticipantsPanelOpen: boolean = false;

  playerToAddToPool: Participant;

  localPool: Pool;
  matches: Match[];

  poolForm: FormGroup;

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
          return data;
        }
      });
    });

    this.localPool = this.pool;
    this.initialiseForm();
  }

  initialiseForm() {
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
    this.initialiseForm();
  }

  cancelChanges() {
    this.localPool = this.pool;
    this.isEdit = false;
    this.initialiseForm();
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

  updateMatch(m: Match) {
    this.matchManager.updateMatch(m)
  }

  deleteMatch(i) {
    this.matchManager.deleteMatch(this.localPool.matchesInfo[i].id);
    this.localPool.matchesInfo.splice(i, 1);
  }

  addMatch(m: Match) {
    const matchId = this.matchManager.createMatch(m);

    this.localPool.matchesInfo.push({ id: matchId, location: m.location, dateAsIsoString: m.dateAsIsoString });
    this.saveChanges();
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
