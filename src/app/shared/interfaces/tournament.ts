import { DateTimeWithLocation } from './date-time-with-location';
import { Participant } from './participant';
import { Pool } from './pool';
import { iMatchInfoItem } from './matchInfoItem';

export interface Tournament {
    name: string;
    id?: string;
    dates: DateTimeWithLocation[];
    participants: Participant[];
    pools: Pool[];
    upcomingMatches: iMatchInfoItem[];
    pastMatches: iMatchInfoItem[];
    winner?: Participant;
    second?: Participant;
    third?: Participant;
    tournamentStarted: boolean;
    tournamentOver: boolean;
}

/* export class Tournament implements ITournament{
    name: string;
    id: string;
    dates: DateTimeWithLocation[];
    participants: Participant;
    pools: Pool;
    winner: Participant;
    second: Participant;
    third: Participant;
    tournamentStarted: boolean;
    tournamentOver: boolean;
} */
