import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { TournamentManagerService } from 'src/app/shared/services/tournament-manager.service';
import { Tournament } from 'src/app/shared/interfaces/tournament';

@Component({
  selector: 'app-refereeing-overview',
  templateUrl: './refereeing-overview.component.html',
  styleUrls: ['./refereeing-overview.component.scss']
})
export class RefereeingOverviewComponent implements OnInit {

  tournaments: Tournament[];
  ongoingTournaments: Tournament[];
  loading: boolean;

  constructor(
    private tournamentService: TournamentManagerService,
    public language: LanguagesService,
  ) { }

  ngOnInit(): void {
    this.ongoingTournaments = [];

    this.loading = true;
    //get all the tournaments from firebase
    this.tournamentService.getTournaments().subscribe(data => {
      this.tournaments = data.map(d => {
        const data = d.payload.doc.data() as Tournament;
        data.id = d.payload.doc.id;
        return data;
      });
      this.tournaments.forEach(e => {
        if (e.tournamentStarted && !e.tournamentOver) {
          this.addOngoingTournament(e);
        }
      });
    });
    this.loading = false;
  }

  addOngoingTournament(t: Tournament) {
    if (!this.ongoingTournaments.includes(t)) {
      this.ongoingTournaments.push(t);
    }
  }

  tournamentsEmpty(): boolean {
    if (this.ongoingTournaments == null || this.ongoingTournaments.length < 1) {
      return true;
    }
    return false;
  }

}
