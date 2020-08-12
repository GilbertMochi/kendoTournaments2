import { Participant } from './participant';
import { Score } from './score';

export interface Match {
    id?: string;
    tournamentId:string;
    poolId:string;
    participant1: Participant;
    participant2: Participant;
    location: string;
    dateAsIsoString: string;
    time: string;//get the time from the date when creating
    p1Score: Score;
    p2Score: Score;
    winner: Participant;
    matchStarted: boolean;
    matchOver: boolean;
}
