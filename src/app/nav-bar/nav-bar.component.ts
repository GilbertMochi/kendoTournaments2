import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../shared/services/languages.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public language:LanguagesService) { }

  ngOnInit(): void {
  }

}
