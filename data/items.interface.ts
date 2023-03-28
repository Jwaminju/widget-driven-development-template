export interface ItemDataInterface {
    name: string;
    img: string;
    story: string;
    tier: number;
    valid_year: number;
    ima_tag: string;
    group: number;
    type: string;
};

export interface ItemSelectInterface {
    [index: string]: number[]
    person: number[];
    enterprise: number[];
    country: number[];
}

