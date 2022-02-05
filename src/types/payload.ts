export interface RequestPayload {
  startDate: Date;
  endDate: Date;
  minCount: number;
  maxCount: number;
}

export interface ResponsePayload {
  code: number;
  msg: string;
  records?: Record[];
}

export interface Record {
  key: string;
  createdAt: Date;
  totalCount: number;
}
