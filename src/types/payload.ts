export interface RequestPayload {
    startDate: Date;
    endDate: Date;
    minCount: number;
    maxCount: number;
}

export interface ResponsePayload {
    code: number;
    message: string;
    records?: Records[];
}

interface Records {
    key: string;
    createdAt: Date;
    totalCount: number;
}