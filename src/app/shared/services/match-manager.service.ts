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
    //firebase doesn't like the score object so the match is made into  anew variable here
    var m = {
      id: match.id,
      tournamentId: match.tournamentId,
      poolId: match.poolId,
      participant1: match.participant1,
      participant2: match.participant2,
      location: match.location,
      dateAsIsoString: match.dateAsIsoString,
      time: match.time,
      p1Score: {
        hitScore: match.p1Score.hitScore,
        faultScore: match.p1Score.faultScore,
        hits: match.p1Score.hits,
        faults: match.p1Score.faults
      },
      p2Score: {
        hitScore: match.p2Score.hitScore,
        faultScore: match.p2Score.faultScore,
        hits: match.p2Score.hits,
        faults: match.p2Score.faults
      },
      matchStarted: match.matchStarted,
      matchOver: match.matchOver,
    }
    this.firestore.doc('Matches/' + match.id).update(m)
      .then(
        () => {
          console.log('match updated');
        }).catch(function (error) {
          console.error('Error writing document: ', error);
        });
  }

  deleteMatch(id: string) {
    this.firestore.doc('Matches/' + id).delete();
  }
}
