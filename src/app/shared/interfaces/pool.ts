import { Participant } from './participant';

export interface Pool {
    name: string;
    id: string;
    participants: Participant[];
    winner?: Participant;
    second?: Participant;
}
