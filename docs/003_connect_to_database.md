# MongoDB Database

Before we connect to database, I want to show more issues that without Database.

```json
[
    {
        "birthAt": "2024-04-12T05:52:29.064Z",
        "name": "",
        "gender": "male",
        "weight": 100,
        "parent": ""
    },
    {
        "name": "陳特勒",
        "gender": "male",
        "birthAt": "04/20/1889",
        "parent": null,
        "weight": 9000
    },
    {
        "name": "Anne",
        "gender": "female",
        "birthAt": "01/01/1700",
        "parent": null,
        "weight": 1000
    }
]
```

By now, you can see our baby information does not contain any unique identifier, which means we can not identify which baby is the one we want, and we are unable to do UPDATE or READ action with this data structure.

With with database Mongodb, it will create `_id` attribute for us automatically.

And the baby table in database should looks like this.

```json
[
    {
        "_id": "ObjectId('aaaabbbccc001')",
        "birthAt": "2024-04-12T05:52:29.064Z",
        "name": "",
        "gender": "male",
        "weight": 100,
        "parent": ""
    },
    {
        "_id": "ObjectId('aaaabbbccc002')",
        "name": "陳特勒",
        "gender": "male",
        "birthAt": "04/20/1889",
        "parent": null,
        "weight": 9000
    },
    {
        "_id": "ObjectId('aaaabbbccc003')",
        "name": "Anne",
        "gender": "female",
        "birthAt": "01/01/1700",
        "parent": null,
        "weight": 1000
    }
]
```

By this, we will have `_id` to do those actions the I mentioned above.

# MongoDb and Mongoose

* More information about MongoDB and Mongoose
  * https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/

We will use Mongoose library to connect to MongoDB.


---

Back to [Simple Validation](./002_simple_validation.md)
