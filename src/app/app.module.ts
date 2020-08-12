import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditableTournamentComponent } from './Management/Editing/editable-tournament/editable-tournament.component';
import { NewTournamentComponent } from './Management/new-tournament/new-tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EditableTournamentComponent,
    NewTournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
