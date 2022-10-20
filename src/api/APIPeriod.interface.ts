export interface APIPeriodRep {
    D: string;
    F: string;
    G: string;
    H: string;
    Pp: string;
    S: string;
    T: string;
    V: string;
    W: string;
    U: string;
    // minutes after midnight
    $: string;
}

export interface APIPeriod {
    type: "Day";
    value: string;
    Rep: APIPeriodRep[];
}
