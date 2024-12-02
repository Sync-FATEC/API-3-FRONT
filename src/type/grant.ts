export type Grant = {
    id: string;
    type: string;
    duration: string;
    acting: string;
    active: boolean;
}

export type createGrant = {
    id?: string;
    type: string;
    months: number;
    years: number;
    acting: string;
    active: boolean;
}

export type updateGrant = {
    id: string;
    type: string;
    months: number;
    years: number;
    acting: string;
    active: boolean;
}