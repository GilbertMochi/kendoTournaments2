import { Match } from './match';

export interface Participant {
    firstname: string;
    lastname: string;
    id?: string;
    wins: number;
    losses: number;
    rank: string;
    //pastMatches: Match[];
}
