import { Participant } from './participant';
import { iMatchInfoItem } from './matchInfoItem';

export interface Pool {
    name:string;
    id:string;
    participants:Participant[];
    matchesInfo:iMatchInfoItem[];
    winner:Participant;
    second:Participant;
}
