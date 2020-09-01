import { Injectable } from '@angular/core';
import { Match } from '../interfaces/match';
import { Score } from '../interfaces/score';
import { PointTypes } from '../PointTypes';
import { MatchManagerService } from './match-manager.service';

@Injectable({
  providedIn: 'root'
})
export class RefereeingService {

  currentMatch: Match;

  constructor(private matchManager: MatchManagerService) { }

  getCurrentMatch(): Match {
    return this.currentMatch;
  }

  startRefereeing(m: Match) {
    this.currentMatch = m;
    this.currentMatch.matchStarted = true;
    this.currentMatch.p1Score = new Score();
    this.currentMatch.p2Score = new Score();
    this.printMatch(m);
    this.updateMatchInFirestore(m);
  }

  endMatch() {
    this.currentMatch.matchOver = true;
    this.updateMatchInFirestore(this.currentMatch);
    this.currentMatch = null;
  }

  givePoints(type: string, playerNumber: number) {
    //there are probably better ways of doing this...
    switch (type) {
      case 'men':
        if (playerNumber == 1) {
          this.currentMatch.p1Score.addHit(PointTypes.men);
        } else if (playerNumber == 2) {
          this.currentMatch.p2Score.addHit(PointTypes.men);
        }
        break;

      case 'kote':
        if (playerNumber == 1) {
          this.currentMatch.p1Score.addHit(PointTypes.kote);
        } else if (playerNumber == 2) {
          this.currentMatch.p2Score.addHit(PointTypes.kote);
        }
        break;

      case 'do':
        if (playerNumber == 1) {
          this.currentMatch.p1Score.addHit(PointTypes.do);
        } else if (playerNumber == 2) {
          this.currentMatch.p2Score.addHit(PointTypes.do);
        }
        break;

      case 'tsuki':
        if (playerNumber == 1) {
          this.currentMatch.p1Score.addHit(PointTypes.tsuki);
        } else if (playerNumber == 2) {
          this.currentMatch.p2Score.addHit(PointTypes.tsuki);
        }
        break;

      case 'ippon':
        if (playerNumber == 1) {
          this.currentMatch.p1Score.addHit(PointTypes.ippon);
        } else if (playerNumber == 2) {
          this.currentMatch.p2Score.addHit(PointTypes.ippon);
        }
        break;

      default:
        console.error("point type of '" + type + "' was not found!");
        break;
    }

    console.log('updating match in firebase');
    this.updateMatchInFirestore(this.currentMatch);
  }

  givePenalty(playerNum: number) {
    //stay sharp! if p1 makes to faults p2 gets the point
    if (playerNum == 1) {
      //if p1 has made less than 2 faults
      if (this.currentMatch.p1Score.faultScore < 1) {
        //add fault to list
        this.currentMatch.p1Score.addFault();
      }
      //p1 has made 2 or more faults
      if (this.currentMatch.p1Score.faultScore >= 1) {
        //give point to p2 and clear p1 faultScore
        this.givePoints('ippon', 2);
        this.currentMatch.p1Score.clearFaultScore();
      }
    }
    else if (playerNum == 2) {
      //if p2 has made less than 2 faults
      if (this.currentMatch.p2Score.faultScore < 1) {
        //add fault to list
        this.currentMatch.p2Score.addFault();
      }
      //p2 has made 2 or more faults
      if (this.currentMatch.p2Score.faultScore >= 1) {
        //give point to p1 and clear p2 faultScore
        this.givePoints('ippon', 1);
        this.currentMatch.p2Score.clearFaultScore();
      }
    }

    this.updateMatchInFirestore(this.currentMatch);
  }

  updateMatchInFirestore(m: Match) {
    if (m != null) {
      this.printMatch(m);
      this.matchManager.updateMatch(m);
    }
  }

  printMatch(m: Match) {
    console.log(m.id);
    console.log(m.location);
    console.log(m.matchOver);
    console.log(m.matchStarted);
    console.log(m.p1Score);
    console.log(m.p2Score);
    console.log(m.participant1);
    console.log(m.participant2);
    console.log(m.poolId);
    console.log(m.time);
    console.log(m.tournamentId);
    console.log(m.winner);//winner is currently null and possibly causes the error in firebase
  }

}
