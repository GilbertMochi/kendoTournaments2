import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../Management/dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
import { NewTournamentComponent } from '../Management/new-tournament/new-tournament.component';
import { EditTournamentsComponent } from '../Management/Editing/edit-tournaments/edit-tournaments.component';
import { RefereeingOverviewComponent } from '../Refereeing/refereeing-overview/refereeing-overview.component';
import { RefereeMatchComponent } from '../Refereeing/referee-match/referee-match.component';
import { LoginComponent } from '../Authentication/login/login.component';
import { RegisterComponent } from '../Authentication/register/register.component';
import { ForgotPasswordComponent } from '../Authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../Authentication/verify-email/verify-email.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-tournaments', component: NewTournamentComponent },
  { path: 'edit-tournaments', component: EditTournamentsComponent },
  { path: 'referee-overview', component: RefereeingOverviewComponent },
  { path: 'referee-match', component: RefereeMatchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
];

//to use naviagation use something like a link with routerLink as such: 
//<a routerLink="/dashboard">some text</a> or
//<a routerLink="/manage-tournaments">some text</a>

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
