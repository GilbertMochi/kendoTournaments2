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
  }

  endMatch() {
    this.currentMatch.matchOver = true;
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

    this.updateMatchInFirestore();
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

    this.updateMatchInFirestore();
  }

  updateMatchInFirestore() {
    if (this.currentMatch != null) {
      this.matchManager.updateMatch(this.currentMatch);
    }
  }


}
