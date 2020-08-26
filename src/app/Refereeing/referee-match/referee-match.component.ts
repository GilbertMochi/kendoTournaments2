import { Component, OnInit } from '@angular/core';
import { RefereeingService } from 'src/app/shared/services/refereeing.service';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Match } from 'src/app/shared/interfaces/match';
import { MatchConfirmationDialogComponent } from '../match-confirmation-dialog/match-confirmation-dialog.component';

@Component({
  selector: 'app-referee-match',
  templateUrl: './referee-match.component.html',
  styleUrls: ['./referee-match.component.scss']
})
export class RefereeMatchComponent implements OnInit {

  match: Match;

  constructor(private router: Router, private referee: RefereeingService, public language: LanguagesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.referee.currentMatch != null) {
      this.match = this.referee.currentMatch;
    }
  }

  openConfirmationDialog() {
    //reference to the dialog for the user's response
    let dialogRef = this.dialog.open(MatchConfirmationDialogComponent);

    //subscribe to the result for more functionality
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {//yes was clicked, so close the march and go back to tournament selection
        this.endMatchAndGoBack();
      }
    });
  }

  endMatchAndGoBack() {
    this.referee.endMatch();
    this.router.navigate(['/referee-overview']);
  }

  goBack() {
    this.router.navigate(['/referee-overview']);
  }

  giveFault(playerNum:number) {
    this.referee.givePenalty(playerNum);
  }

  givePoint(type: string, playerNum:number) {
    this.referee.givePoints(type,playerNum);
  }

}
