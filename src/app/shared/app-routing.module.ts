import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../Management/dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
import { NewTournamentComponent } from '../Management/new-tournament/new-tournament.component';
import { EditableTournamentComponent } from '../Management/Editing/editable-tournament/editable-tournament.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-tournaments', component: NewTournamentComponent },
  { path: 'edit-tournaments', component: EditableTournamentComponent },
  // { path: 'referee-overview', component:  },
  // { path: 'referee-match', component:  },
];

//to use naviagation use something like a link with routerLink as such: 
//<a routerLink="/dashboard">some text</a> or
//<a routerLink="/manage-tournaments">some text</a>

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
