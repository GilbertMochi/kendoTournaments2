import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from '../shared/Authorisation/auth.service'

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
import { AuthGuard } from './Authorisation/auth.guard';
import { Role } from './roles';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-tournaments', component: NewTournamentComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'edit-tournaments', component: EditTournamentsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'referee-overview', component: RefereeingOverviewComponent, canActivate: [AuthGuard] },
  { path: 'referee-match', component: RefereeMatchComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
];

//to use naviagation use something like a link with routerLink as such: 
//<a routerLink="/dashboard">some text</a> or
//<a routerLink="/manage-tournaments">some text</a>

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
