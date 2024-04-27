# Connect To Database

Before we connect to database, I want to show more issues of that without Database.

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

By now, you can see our baby information does not contain any unique identifier, which means we can not identify which baby is the one we want, and we are unable to do UPDATE, READ, DELETE action with this data structure.

With database Mongodb, it will create `_id` attribute for us automatically.

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

By doing this, we will have `_id` to do those actions that I mentioned above.

# MongoDb and Mongoose

* More information about MongoDB and Mongoose
  * https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
* Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. That's why we wrote Mongoose.
  * lol https://mongoosejs.com/
* We use https://www.mongodb.com to hosting our database right now.
  * See more here https://www.mongodb.com/basics/mongodb-atlas-tutorial  
  * !!! IMPORTANT !!!!
  * Make sure you have already create the server and had the DB_URI to do next step.
  * !!! IMPORTANT !!!!


We will use Mongoose library to connect to MongoDB.

Install mongoose library

```
npm install --save mongoose
```

Then add following code to the top of `index.js` file

```js
// We will inject DB_URI from environment variable
// There are several different ways to achieve this
// You even can replace process.env.DB_URI with a single string.
// But for now, I want to hide my server from public.
// So I will inject the DB_URI variable from environment 
const DB_URI  = process.env.DB_URI
// then require mongoose package
const mongoose = require('mongoose')
```

Now I want to make sure we have been established the connection to database before the app start

So change the `app.listen` part like this

```js
console.log('Connecting to database')
mongoose.connect(DB_URI).then(_ => {
  console.log('Database connected, now starting app')
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
})
```

And then run the application, it should output like this

```
➜  Baby-Hospital git:(main) ✗ node backend/index.js
Connecting to database
Database connected, now starting app
App listening on port 1145
```

!!!! IMPORTANT !!!!!

If you did not see those message, check all steps above.

!!!! IMPORTANT !!!!!


# Connection Established

After it has connected to the database, we can rewrite our application now.

First we are going to define a baby model.

You can just put the model definition below the line `const port = 1145`, for example...

```js
// DO NOT COPY THIS LINE
// DO NOT COPY THIS LINE
const port = 1145
// DO NOT COPY THIS LINE
// DO NOT COPY THIS LINE

// The baby model
const Baby = mongoose.model(
  "Baby",
  new mongoose.Schema({
      name: { type: String},
      gender: {type: String },
      parent: { type: String},
      weight: { type: Number },
      birthAt: { type: Date},
      /* 
      We use the new option 'default' here, 
      which means "If no value is provided, the value define here will be used."

      We want every baby create in here mark as NOT deleted.
      So use `default: false` here.

      And this flag will be Boolean type.
      */
      markAsDeleted: { type: Boolean, default: false}
  })
)
```


And rewrite this part in baby create route

```js
// Write into the storage object and return 
BABY.push(baby)
res.json(baby)
```

To

```js
Baby.create(baby).then(_ => {
res.json(baby)
})
```

Because `Baby.create` is a async function, so we need to wait for action finish then do `res.json`

Now go to the route `GET /api/baby`

```js
app.get('/api/baby', (req, res) => {
  res.json(BABY)
})
```

Change to

```js
app.get('/api/baby', (req, res) => {
  Baby.find({}).then(babyList => {
    res.json(babyList)
  })
})
```

As last route, every operation to database will be asynchronous, we need to wait for action to finished then do `res.json


Now we can remove the old "database" by comment out the following line
```
// var BABY = []
```

Now heading to http://localhost:8080, you should able to see something like this, if it shows no data, try to create something first.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/005.jpg?raw=true)


Then go to [CRUD with Database](./004_CRUD_with_database.md) to finish update and delete action.

---

Back to [002 Simple Validation](./002_simple_validation.md)
