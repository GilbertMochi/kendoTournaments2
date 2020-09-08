import { Injectable } from '@angular/core';
import { Match } from '../interfaces/match';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MatchManagerService {

  constructor(private firestore: AngularFirestore) { }

  getMatches() {
    return this.firestore.collection('Matches').snapshotChanges();
  }

  createMatch(match: Match): string {
    var id;
    this.firestore.collection('Matches').add(match).then(function (docRef) {
      id = docRef.id;
      //console.log('id should be: ' + id);
    }).catch(function (error) { console.error(error) });
    return id;
  }

  async AddNewMatch(m: Match) {
    let docRef = this.firestore.collection('Matches').add(m);
    try {
      const docAdded = await docRef;
      this.firestore.doc('Matches/' + docAdded.id).update({ id: docAdded.id });
      return docRef;
    } catch (err) {
      return err;
    }
  }

  async updateMatch(match: Match) {
    this.firestore.doc('Matches/' + match.id).update(match)
      .then(
        () => {
          //console.log('match updated');
        }).catch(function (error) {
          console.error('Error writing document: ', error);
        });
  }

  deleteMatch(id: string) {
    this.firestore.doc('Matches/' + id).delete();
  }
}
