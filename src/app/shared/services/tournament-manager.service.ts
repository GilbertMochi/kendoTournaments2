import { Injectable } from '@angular/core';
import { Tournament } from '../interfaces/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentManagerService {
  
  constructor(private firestore: AngularFirestore) { }

  getTournaments() {
    return this.firestore.collection('Tournaments').snapshotChanges();
  }

  createTournament(tournament: Tournament) {
    return this.firestore.collection('Tournaments').add(tournament);
  }

  updateTournament(tournament: Tournament) {
    this.firestore.doc('Tournaments/' + tournament.id).update(tournament);
  }

  deleteTournament(id: string) {
    this.firestore.doc('Tournaments/' + id).delete();
  }
}
