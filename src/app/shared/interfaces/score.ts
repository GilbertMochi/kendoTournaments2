import { Point } from './point';
import { PointTypes } from '../PointTypes';

export interface IScore {
    hitScore: number;
    faultScore: number;
    hits: Point[];
    faults: Point[];
}

export class Score implements IScore {
    hitScore: number;
    faultScore: number;
    hits: Point[];
    faults: Point[];

    constructor() {
        this.hitScore = 0;
        this.faultScore = 0;
        this.hits = [];
        this.faults = [];
    }

    addHit(type: PointTypes) {
        this.hits.push(new Point(type, this.getValueFromType(type)));
        this.hitScore += this.getValueFromType(type);
    }

    addFault() {
        this.faults.push(new Point(PointTypes.fault, this.getValueFromType(PointTypes.fault)));
        this.faultScore += this.getValueFromType(PointTypes.fault);
    }

    clearFaultScore() {
        this.faultScore = 0;
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
}


