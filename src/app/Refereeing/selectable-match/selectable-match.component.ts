import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/shared/interfaces/match';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { RefereeingService } from 'src/app/shared/services/refereeing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selectable-match',
  templateUrl: './selectable-match.component.html',
  styleUrls: ['./selectable-match.component.scss']
})
export class SelectableMatchComponent implements OnInit {
  @Input() match: Match;

  constructor(
    public language: LanguagesService,
    private referee: RefereeingService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setMatchToReferee() {
    this.referee.startRefereeing(this.match);
    this.router.navigate(['/referee-match']);
  }

}
