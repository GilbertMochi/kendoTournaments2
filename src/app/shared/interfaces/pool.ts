import { Participant } from './participant';

export interface Pool {
    name:string;
    id:string;
    participants:Participant[];
    matchesInfo:string[];//array of the match id's which belong to this pool
    winner:Participant;
    second:Participant;
}
