import { Document } from "mongodb";

export interface RequestPayload {
  startDate: Date;
  endDate: Date;
  minCount: number;
  maxCount: number;
}

export interface ResponsePayload {
  code: number;
  msg: string;
  records?: Document[];
}

export interface Record {
  key: string;
  createdAt: Date;
  totalCount: number;
}
