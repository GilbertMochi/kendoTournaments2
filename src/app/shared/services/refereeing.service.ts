import { Injectable } from '@angular/core';
import { Match } from '../interfaces/match';
import { PointTypes } from '../PointTypes';
import { MatchManagerService } from './match-manager.service';
import { Participant } from '../interfaces/participant';
import { Point } from '../interfaces/point';

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
    if (!m.matchStarted) {
      this.currentMatch.matchStarted = true;
      this.currentMatch.p1Score = { hits: [], faults: [], faultScore: 0, hitScore: 0 };
      this.currentMatch.p2Score = { hits: [], faults: [], faultScore: 0, hitScore: 0 };
      //this.printMatch(this.currentMatch);
      this.updateMatchInFirestore();
    }
  }

  endMatch(winner: Participant) {
    this.currentMatch.matchOver = true;
    this.currentMatch.winner = winner;
    this.updateMatchInFirestore();
    this.currentMatch = null;
  }

  updateMatchInFirestore() {
    if (this.currentMatch != null) {
      // this.printMatch(this.currentMatch);
      this.matchManager.updateMatch(this.currentMatch);
    }
  }

  resetMatch() {
    this.currentMatch.matchStarted = true;
    this.currentMatch.p1Score = { hits: [], faults: [], faultScore: 0, hitScore: 0 };
    this.currentMatch.p2Score = { hits: [], faults: [], faultScore: 0, hitScore: 0 };
    this.updateMatchInFirestore();
  }

  givePoints(type: string, playerNumber: number) {
    //there are probably better ways of doing this...
    switch (type) {
      case 'men':
        if (playerNumber == 1) {
          this.addHit(PointTypes.men, 1);
        } else if (playerNumber == 2) {
          this.addHit(PointTypes.men, 2);
        }
        break;

      case 'kote':
        if (playerNumber == 1) {
          this.addHit(PointTypes.kote, 1);
        } else if (playerNumber == 2) {
          this.addHit(PointTypes.kote, 2);
        }
        break;

      case 'do':
        if (playerNumber == 1) {
          this.addHit(PointTypes.do, 1);
        } else if (playerNumber == 2) {
          this.addHit(PointTypes.do, 2);
        }
        break;

      case 'tsuki':
        if (playerNumber == 1) {
          this.addHit(PointTypes.tsuki, 1);
        } else if (playerNumber == 2) {
          this.addHit(PointTypes.tsuki, 2);
        }
        break;

      case 'ippon':
        if (playerNumber == 1) {
          this.addHit(PointTypes.ippon, 1);
        } else if (playerNumber == 2) {
          this.addHit(PointTypes.ippon, 2);
        }
        break;

      default:
        console.error("point type of '" + type + "' was not found!");
        break;
    }

    //console.log('updating match in firebase');
    this.updateMatchInFirestore();
  }

  givePenalty(playerNum: number) {
    //stay sharp! if p1 makes to faults p2 gets the point
    if (playerNum == 1) {
      //if p1 has made less than 2 faults
      if (this.currentMatch.p1Score.faultScore < 1) {
        //add fault to list
        this.addFault(1);
      }
      //p1 has made 2 or more faults
      if (this.currentMatch.p1Score.faultScore >= 1) {
        //give point to p2 and clear p1 faultScore
        this.givePoints('ippon', 2);
        this.clearFaultScore(1);
      }
    }
    else if (playerNum == 2) {
      //if p2 has made less than 2 faults
      if (this.currentMatch.p2Score.faultScore < 1) {
        //add fault to list
        this.addFault(2);
      }
      //p2 has made 2 or more faults
      if (this.currentMatch.p2Score.faultScore >= 1) {
        //give point to p1 and clear p2 faultScore
        this.givePoints('ippon', 1);
        this.clearFaultScore(2);
      }
    }

    this.updateMatchInFirestore();
  }

  addHit(type: PointTypes, playerNum: number) {
    if (playerNum == 1) {
      this.currentMatch.p1Score.hits.push(this.getPoint(type));
      this.currentMatch.p1Score.hitScore += this.getValueFromType(type);
    } else if (playerNum == 2) {
      this.currentMatch.p2Score.hits.push(this.getPoint(type));
      this.currentMatch.p2Score.hitScore += this.getValueFromType(type);
    }

  }

  addFault(playerNum: number) {
    if (playerNum == 1) {
      this.currentMatch.p1Score.faults.push(this.getPoint(PointTypes.fault));
      this.currentMatch.p1Score.faultScore += this.getValueFromType(PointTypes.fault);
    } else if (playerNum == 2) {
      this.currentMatch.p2Score.faults.push(this.getPoint(PointTypes.fault));
      this.currentMatch.p2Score.faultScore += this.getValueFromType(PointTypes.fault);
    }
  }

  clearFaultScore(playerNum: number) {
    if (playerNum == 1) {
      this.currentMatch.p1Score.faultScore = 0;
    } else if (playerNum == 2) {
      this.currentMatch.p2Score.faultScore = 0;
    }
  }

  public getValueFromType(t: PointTypes): number {
    var val;
    switch (t) {
      case PointTypes.men:
        val = 1;
        break;
      case PointTypes.kote:
        val = 1;
        break;
      case PointTypes.do:
        val = 1;
        break;
      case PointTypes.tsuki:
        val = 1;
        break;
      case PointTypes.ippon:
        val = 1;
        break;
      case PointTypes.fault:
        val = .5;
        break;
      default:
        val = 0;
        break;
    }
    return val;
  }

  getPointTypeAsString(type: PointTypes): string {
    var val;
    switch (type) {
      case PointTypes.men:
        val = "men";
        break;
      case PointTypes.kote:
        val = "kote";
        break;
      case PointTypes.do:
        val = "do";
        break;
      case PointTypes.tsuki:
        val = "tsuki";
        break;
      case PointTypes.ippon:
        val = "ippon";
        break;
      case PointTypes.fault:
        val = "fault";
        break;
      default:
        val = " ";
        break;
    }
    return val;
  }

  getPoint(type: PointTypes): Point {
    const po: Point = {
      point_type: type,
      time: new Date().toISOString(),
      value: this.getValueFromType(type)
    };
    return po;
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
    // console.log(m.winner);//winner is currently null and possibly causes the error in firebase
  }

}
