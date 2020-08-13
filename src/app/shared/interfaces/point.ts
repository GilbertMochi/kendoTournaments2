import { PointTypes } from '../PointTypes';

export interface IPoint {
    date:Date;
    point_type: PointTypes;
    value: number;
    time: string;
}

/*
   <p>The time is {{today | date:'h:mm a z'}}</p>

// Get the current date and time as a date-time value.
export class DatePipeComponent {
  today: number = Date.now();
}
*/

export class Point implements IPoint {
    date:Date;
    public point_type: PointTypes;
    public value: number;
    public time: string;

    constructor(t: PointTypes, val: number) {
        this.date=new Date();
        this.point_type = t;
        this.value = val;
        this.time = this.date.toISOString();
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

}
