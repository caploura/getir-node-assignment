## getir-node-assignment

# Instructions:

    npm install

    Configure the following variables in your .env file:
    
        PORT (Port where this application will be listening for requests)

        MONGODB_USERNAME (MongoDB username)
        MONGODB_PASSWORD (MongoDB password)
        MONGODB_DATABASE (MongoDB database)
        MONGODB_COLLECTION (MongoDB Collection)

# To compile:

    npm run build

# To test

    npm test

# To run:

    npm start

        Local endpoint: http://localhost:3000/fetchByDateAndTotalCount
        Public endpoint: https://getir-nodejs-assignment-cl.herokuapp.com/fetchByDateAndTotalCount

# Examples

    Request Payload:
        {
            "startDate": "2015-01-27T01:20:48.978+00:00",
            "endDate": "2020-01-29T10:59:48.978+00:00",
            "minCount": 0,
            "maxCount": 200
        }

    Response Payload:

        {
            "code": 0,
            "msg": "Success",
            "records": [
                {
                    "key": "TAKwGc6Jr4i8Z487",
                    "createdAt": "2017-01-28T01:22:14.398Z",
                    "totalCount": 170
                }
            ]
        }
