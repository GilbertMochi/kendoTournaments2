import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-match-confirmation-dialog',
  templateUrl: './match-confirmation-dialog.component.html',
  styleUrls: ['./match-confirmation-dialog.component.scss']
})
export class MatchConfirmationDialogComponent implements OnInit {

  constructor(public language: LanguagesService) { }

  ngOnInit(): void {
  }

}
