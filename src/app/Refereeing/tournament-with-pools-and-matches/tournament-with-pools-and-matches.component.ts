import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from 'src/app/shared/interfaces/tournament';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-tournament-with-pools-and-matches',
  templateUrl: './tournament-with-pools-and-matches.component.html',
  styleUrls: ['./tournament-with-pools-and-matches.component.scss']
})
export class TournamentWithPoolsAndMatchesComponent implements OnInit {
  @Input() tournament: Tournament;

  tournamentPanelOpen: boolean = false;

  constructor(public language: LanguagesService) { }

  ngOnInit(): void {
  }

}
