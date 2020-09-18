import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pool } from 'src/app/shared/interfaces/pool';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { MatchManagerService } from 'src/app/shared/services/match-manager.service';
import { Match } from 'src/app/shared/interfaces/match';
import { Participant } from 'src/app/shared/interfaces/participant';

@Component({
  selector: 'app-pool-with-matches',
  templateUrl: './pool-with-matches.component.html',
  styleUrls: ['./pool-with-matches.component.scss']
})
export class PoolWithMatchesComponent implements OnInit {
  @Input() pool: Pool;
  @Input() tournamentId: string;
  @Output() poolWinner = new EventEmitter<Participant>();
  @Output() poolSecond = new EventEmitter<Participant>();

  matches: Match[] = [];
  matchesForThisPool: Match[] = [];
  upcomingMatches: Match[] = [];//array of matches that aren't over yet

  winner: Participant;
  second: Participant;

  constructor(
    public language: LanguagesService,
    private matchManager: MatchManagerService,
  ) { }

  ngOnInit(): void {
    //get all the matches for this pool from firebase
    this.matchManager.getMatches().subscribe(data => {
      this.matches = data.map(d => {
        const data = d.payload.doc.data() as Match;
        //if the match belongs to this tournament and pool
        if (data.tournamentId == this.tournamentId && data.poolId == this.pool.id) {
          data.id = d.payload.doc.id;
          //console.log(data);
          this.matchesForThisPool.push(data);

          return data;
        }
      });
    });

    this.matchesForThisPool.forEach(element => {//push the matches that arent over to upcoing matches array
      if (element.matchOver == true) {
        this.upcomingMatches.push(element);
      }
    });

    //if pool has winners set
    if (this.pool.winner != null) {
      this.winner = this.pool.winner;
    }
    if (this.pool.second != null) {
      this.second = this.pool.second;
    }
  }

  saveWinner() {
    if (this.winner != null) {
      this.poolWinner.emit(this.winner);
    }
  }

  saveSecond() {
    if (this.second != null) {
      this.poolSecond.emit(this.second);
    }
  }

  canSaveWinner(): boolean {
    if (this.winner != null) {//if winner has been set
      if (this.winner != this.pool.winner) {//if the winner is different fromt he one in firebase
        return true;
      }
    } else {
      return false;
    }
  }

  canSaveSecond(): boolean {
    if (this.second != null) {
      if (this.second != this.pool.second) {
        return true;
      }
    } else {
      return false;
    }
  }

  poolMatchesAreOver(): boolean {
    this.matchesForThisPool.forEach(element => {
      if (element.matchOver == false) {//if any of the matches isnät over return false
        return false;
      }
    });
    return true;//if none of the matches had isOVer==false all matches are over and function returns true
  }
  
  poolHasParticipantsSet(): boolean {
    if (this.pool.participants.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  showWinnerSelection() {
    if (this.poolHasParticipantsSet()) {
      if (this.winner == null || this.second == null) {
        return true;
      }
    }
    else {
      return false;
    }
  }

}
