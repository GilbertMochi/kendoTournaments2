import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomMaterialModule } from './shared/material';
import { CustomFirebaseModule } from './shared/firebase';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './Management/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewTournamentComponent } from './Management/new-tournament/new-tournament.component';
import { EditTournamentsComponent } from './Management/Editing/edit-tournaments/edit-tournaments.component';
import { EditableTournamentComponent } from './Management/Editing/editable-tournament/editable-tournament.component';
import { EditableParticipantComponent } from './Management/Editing/editable-participant/editable-participant.component';
import { EditablePoolComponent } from './Management/Editing/editable-pool/editable-pool.component';
import { RefereeingOverviewComponent } from './Refereeing/refereeing-overview/refereeing-overview.component';
import { PoolWithMatchesComponent } from './Refereeing/pool-with-matches/pool-with-matches.component';
import { SelectableMatchComponent } from './Refereeing/selectable-match/selectable-match.component';
import { TournamentWithPoolsAndMatchesComponent } from './Refereeing/tournament-with-pools-and-matches/tournament-with-pools-and-matches.component';
import { RefereeMatchComponent } from './Refereeing/referee-match/referee-match.component';
import { MatchConfirmationDialogComponent } from './Refereeing/match-confirmation-dialog/match-confirmation-dialog.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { ForgotPasswordComponent } from './Authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './Authentication/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavBarComponent,
    NewTournamentComponent,
    EditableTournamentComponent,
    EditTournamentsComponent,
    EditableParticipantComponent,
    EditablePoolComponent,
    RefereeingOverviewComponent,
    PoolWithMatchesComponent,
    SelectableMatchComponent,
    TournamentWithPoolsAndMatchesComponent,
    RefereeMatchComponent,
    MatchConfirmationDialogComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  entryComponents: [MatchConfirmationDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomMaterialModule,
    CustomFirebaseModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
