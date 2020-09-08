import { Point } from './point';

export interface Score {
    hitScore: number;
    faultScore: number;
    hits?: Point[];
    faults?: Point[];
}


