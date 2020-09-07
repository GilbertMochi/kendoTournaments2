import { Component, OnInit, Input } from '@angular/core';
import { Pool } from 'src/app/shared/interfaces/pool';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { MatchManagerService } from 'src/app/shared/services/match-manager.service';
import { Match } from 'src/app/shared/interfaces/match';

@Component({
  selector: 'app-pool-with-matches',
  templateUrl: './pool-with-matches.component.html',
  styleUrls: ['./pool-with-matches.component.scss']
})
export class PoolWithMatchesComponent implements OnInit {
  @Input() pool: Pool;
  @Input() tournamentId: string;

  matches: Match[] = [];
  matchesForThisPool: Match[] = [];

  constructor(
    public language: LanguagesService,
    private matchManager: MatchManagerService
  ) { }

  ngOnInit(): void {
    //get all the matches for this pool from firebase
    this.matchManager.getMatches().subscribe(data => {
      this.matches = data.map(d => {
        const data = d.payload.doc.data() as Match;
        //if the match belongs to this tournament and pool
        if (data.tournamentId == this.tournamentId && data.poolId == this.pool.id) {
          data.id = d.payload.doc.id;
          this.matchesForThisPool.push(data);
          //console.log("matches should have been added");
          return data;
        }
      });
    });
  }

}
