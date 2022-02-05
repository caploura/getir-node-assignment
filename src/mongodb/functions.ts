import { MongoClient } from "mongodb";

// Use .env file as environment configuration
import dotenv from "dotenv";
dotenv.config();

const username = process.env.MONGODB_USERNAME || "";
const password = process.env.MONGODB_PASSWORD || "";
const database = process.env.MONGODB_DATABASE || "";
const collection = process.env.MONGODB_COLLECTION || "";

const mongoDbUrl = `mongodb+srv://${username}:${password}@challenge-xzwqd.mongodb.net/${database}?retryWrites=true`;
let client: MongoClient = new MongoClient(mongoDbUrl);

export const mongoDbConnection = async () => {
  client = await client.connect();
};

export const mongoDbQueryDataByDateAndTotalCount = async (
  startDate: Date,
  endDate: Date,
  maxCount: number,
  minCount: number
) => {
  await mongoDbConnection();

  try {
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
  } catch (error) {
    console.log(`Error:`);
    console.log(error);
    throw new Error("Failed to query MongoDB");
  }
};
