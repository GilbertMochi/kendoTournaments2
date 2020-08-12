import { NgModule } from "@angular/core";

import { environment } from '../../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
    ],
    exports: [
        AngularFireModule,
        AngularFireDatabaseModule,
    ],
})

export class CustomFirebaseModule { }