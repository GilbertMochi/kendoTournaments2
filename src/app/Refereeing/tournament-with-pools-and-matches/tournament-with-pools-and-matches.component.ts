import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from 'src/app/shared/interfaces/tournament';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { TournamentManagerService } from 'src/app/shared/services/tournament-manager.service';
import { Participant } from 'src/app/shared/interfaces/participant';

@Component({
  selector: 'app-tournament-with-pools-and-matches',
  templateUrl: './tournament-with-pools-and-matches.component.html',
  styleUrls: ['./tournament-with-pools-and-matches.component.scss']
})
export class TournamentWithPoolsAndMatchesComponent implements OnInit {
  @Input() tournament: Tournament;

  tournamentPanelOpen: boolean = false;

  constructor(public language: LanguagesService, private tournamentManager: TournamentManagerService) { }

  ngOnInit(): void {
  }

  poolWinner($event: Participant, i: number) {
    this.tournament.pools[i].winner = $event;
    this.tournamentManager.updateTournament(this.tournament);
  console.log("trying to update pool winner to tournament in firebase");
  }

  poolSecond($event: Participant, i: number) {
    this.tournament.pools[i].second = $event;
    this.tournamentManager.updateTournament(this.tournament);
  console.log("trying to update pool second to tournament in firebase");
  }

}
