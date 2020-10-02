import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
// tslint:disable: typedef
export class AuthService {
  public user$: Observable<User>;
  constructor(private localAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.user$ = new Observable((subscriber) => {
      this.localAuth.onAuthStateChanged(subscriber);
    });
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.localAuth.signInWithPopup(provider);
    return this.updateUser(credentials.user);
  }

  private updateUser(user) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  public async signOut() {
    await this.localAuth.signOut();
    this.router.navigate(['home']);
  }




}
