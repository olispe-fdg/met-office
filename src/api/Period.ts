import { DateTime, Duration } from "luxon";
import { APIPeriod, APIPeriodRep } from "./APIPeriod.interface";

export interface PeriodRep extends APIPeriodRep {
    date: DateTime;
}

export class Period {
    date: DateTime;
    reps: PeriodRep[];

    constructor(data: APIPeriod) {
        // Remove Z from end of iso string to work with luxon
        const iso = data.value.slice(0, -1);
        this.date = DateTime.fromISO(iso);

        this.reps = data.Rep.map((rep) => {
            const minutes = Duration.fromObject({ minutes: parseInt(rep.$) });
            const repDate = this.date.plus(minutes);
            return {
                ...rep,
                date: repDate,
            };
        });
    }

    getNextRep() {
        const now = DateTime.now().toMillis();

        const nextRep = this.reps.reduce((prev, curr) => {
            const diff = curr.date.toMillis() - now;

            if (diff < 0) {
                return prev;
            }

            if (prev === null) {
                return curr;
            }

            if (diff < prev.date.toMillis() - now) {
                return curr;
            }

            return prev;
        }, null as PeriodRep | null);

        if (!nextRep) {
            return this.reps[this.reps.length - 1];
        }

        return nextRep;
    }
}
