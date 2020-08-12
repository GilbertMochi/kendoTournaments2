import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public language:LanguagesService) { }

  ngOnInit(): void {
  }

}
