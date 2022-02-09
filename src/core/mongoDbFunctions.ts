import { MongoClient } from "mongodb";

// Use .env file as environment configuration
import dotenv from "dotenv";
dotenv.config();

import { Logger } from "../utils/logger";

const username = process.env.MONGODB_USERNAME || "";
const password = process.env.MONGODB_PASSWORD || "";
const database = process.env.MONGODB_DATABASE || "";
const collection = process.env.MONGODB_COLLECTION || "";
const hostname = process.env.MONGODB_HOSTNAME || "";

const mongoDbUrl = `mongodb+srv://${username}:${password}@${hostname}/${database}?retryWrites=true`;
let client: MongoClient = new MongoClient(mongoDbUrl);

export const mongoDbConnection = async () => {
  const logger = Logger.getLogger();
  try {
    client = await client.connect();
  } catch (error) {
    logger.error(error);
    throw new Error(`${error}`);
  }
};

export const mongoDbQueryDataByDateAndTotalCount = async (
  startDate: Date,
  endDate: Date,
  maxCount: number,
  minCount: number
) => {
  await mongoDbConnection();

  console.log(
    `Fetching data between ${startDate} and ${endDate}, with count between ${minCount} and ${maxCount}`
  );

  const agg = [
    {
      $match: {
        $and: [
          { createdAt: { $lt: new Date(endDate) } },
          { createdAt: { $gt: new Date(startDate) } },
        ],
      },
    },
    {
      $project: {
        key: 1,
        createdAt: 1,
        totalCount: {
          $sum: "$counts",
        },
      },
    },
    {
      $match: {
        $and: [
          { totalCount: { $gt: minCount } },
          { totalCount: { $lt: maxCount } },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1,
      },
    },
  ];

  const collectionRecords = client.db(database).collection(collection);

  return await collectionRecords.aggregate(agg).toArray();
};
