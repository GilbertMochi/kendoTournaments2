import { Injectable } from '@angular/core';
import { Match } from '../interfaces/match';

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
    this.firestore.collection('Matches').add(match).then((query) => {
      id = query.id
    });
    return id;
  }

  updateMatch(match: Match) {
    this.firestore.doc('Matches/' + match.id).update(match);
  }

  deleteMatch(id: string) {
    this.firestore.doc('Matches/' + id).delete();
  }
}
