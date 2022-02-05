import {MongoClient} from 'mongodb';

import { Data } from '../types/data';

const mongoDbConnection = async () => {
    const username = process.env.MONGODB_USERNAME || '';
    const password = process.env.MONGODB_PASSWORD || '';

    const mongoDbUrl = `mongodb+srv://${username}:${password}@challenge-xzwqd.mongodb.net/getircase-study?retryWrites=true`;

    const client = new MongoClient(mongoDbUrl);
    return await client.connect();
}

const mongoDbCloseConnection = async (client: any) => {
    await client.close();
}

export const mongoDbQueryDataByDateAndTotalCount = async(startDate: Date, endDate: Date, maxCount: number, minCount: number) => {
    const dbName = process.env.MONGODB_DATABASE || '';
    const collectionName = process.env.MONGODB_COLLECTION || "";

    try {

        console.log(`Fetching data between ${startDate} and ${endDate}, with count between ${minCount} and ${maxCount}`);

        const agg = [
            { 
                $match: { 
                    $and: [ 
                        { createdAt: { $lt: new Date(endDate) } }, 
                        { createdAt: { $gt: new Date(startDate) } }
                    ] 
                } 
            },
            { 
                $project: { 
                    "key": 1, 
                    "createdAt": 1, 
                    "totalCount": { 
                        $sum: "$counts" 
                    }
                }
            },
            {
                $match: {
                    $and: [
                        { "totalCount": { $gt: minCount } },
                        { "totalCount": { $lt: maxCount } }
                    ]
                }
            },
            { 
                $project: { 
                    "_id": 0, 
                    "key":1,
                    "createdAt":1, 
                    "totalCount": 1
                }
            }
        ];

        const client = await mongoDbConnection();
        const collectionRecords = client.db(dbName).collection(collectionName);

        return await collectionRecords.aggregate(agg).toArray();

        // await recordsCursor.forEach(console.dir);
        // await mongoDbCloseConnection(client);

    } catch(error) {
        console.log(error);
    }
}