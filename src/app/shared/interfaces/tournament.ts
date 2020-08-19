import { DateTimeWithLocation } from './date-time-with-location';
import { Participant } from './participant';
import { Pool } from './pool';

export interface Tournament {
    name: string;
    id?: string;
    dates: DateTimeWithLocation[];
    participants: Participant[];
    pools: Pool[];
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
