import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component:  },
  // { path: 'dashboard', component:  },
  // { path: 'manage-tournaments', component:  },
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
