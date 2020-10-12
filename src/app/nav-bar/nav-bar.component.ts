import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AuthService } from '../shared/Authorisation/auth.service';
import { LanguagesService } from '../shared/services/languages.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private au:AuthService,private router:Router, public language:LanguagesService) { }

  ngOnInit(): void {
  }

  loggedIn():boolean{
    return this.au.isLoggedIn;
  }

  logout(){
    this.au.logout();
    this.router.navigate(['/home']);
  }

}
