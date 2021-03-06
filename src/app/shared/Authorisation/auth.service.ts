import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '../interfaces/user';
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
        isAdmin: false,
        isOrganiser: false
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
      isAdmin: false,
      isOrganiser: false
    })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      isAdmin: user.isAdmin,
      isOrganiser: user.isOrganiser,
    }
    return userRef.set(data, { merge: true });
  }

  // determines if user has matching role
  isAdmin(user: User): boolean {
    if (!user) {
      return false;
    } if (user.isAdmin) {
      return true;
    }
    return false;
  }

  isOrgniser(user: User): boolean {
    if (!user) {
      return false;
    } if (user.isOrganiser) {
      return true;
    }
    return false;
  }

  isReferee(user: User): boolean {
    if (!user) {
      return false;
    } if (!user.isAdmin || !user.isOrganiser) {
      return true;
    }
    return false;
  }

}
