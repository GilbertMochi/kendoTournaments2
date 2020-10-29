import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '../interfaces/user';
//import { User } from  'firebase';
import { Role } from '../interfaces/roles';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  user$: Observable<User>;
  newUser: User;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    //if the user is logged in, we add the user's data to the browser's local storage; otherwise we store a null user
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // });

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return this.afs.doc<User>(`Users/${user.uid}`).valueChanges();
        } else {
          localStorage.setItem('user', null);
          return of(null)
        }
      }));

  }

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password).then(() =>
        this.router.navigate(['/dashboard']));
  }

  async register(email: string, password: string, user: User) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
      this.newUser = {
        email: email,
        uid: userCredentials.user.uid,
        role: user.role
      };
      this.insertNewUser(this.newUser).then(() => this.router.navigate(['/dashboard']));
    }).catch(error => {
      this.eventAuthError.next(error);
    });
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification().then(() => this.router.navigate(['/verify-email']));
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  insertNewUser(user: User) {
    return this.afs.doc(`Users/${user.uid}`).set({
      email: user.email,
      uid: user.uid,
      role: user.role
    })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      role: user.role
    }
    return userRef.set(data, { merge: true });
  }

  //stolen from fireship.io's tutorial

  canRead(user: User): boolean {
    const allowed = ['admin', 'organiser', 'referee'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'organiser', 'referee'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['organiser'];
    return this.checkAuthorization(user, allowed);
  }



  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.role[role]) {
        return true;
      }
    }
    return false;
  }

}
