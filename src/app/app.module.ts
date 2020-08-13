import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomMaterialModule } from './shared/material';
import { CustomFirebaseModule } from './shared/firebase';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Management/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewTournamentComponent } from './Management/new-tournament/new-tournament.component';
import { EditTournamentsComponent } from './Management/Editing/edit-tournaments/edit-tournaments.component';
import { EditableTournamentComponent } from './Management/Editing/editable-tournament/editable-tournament.component';
import { EditableParticipantComponent } from './Management/Editing/editable-participant/editable-participant.component';

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
  ],
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
