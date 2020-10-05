import { NgModule } from "@angular/core";

import { environment } from '../../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    exports: [
        AngularFireModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
})

export class CustomFirebaseModule { }