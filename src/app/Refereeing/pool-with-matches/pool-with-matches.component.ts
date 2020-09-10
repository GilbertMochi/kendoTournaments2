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
          console.log(data);
          if (data.matchOver == false)//if match isn't over add it to the match array
          {
            this.matchesForThisPool.push(data);
            //console.log('match added to this pools matches')
          }
          //console.log("matches should have been added");
          return data;
        }
      });
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

}
