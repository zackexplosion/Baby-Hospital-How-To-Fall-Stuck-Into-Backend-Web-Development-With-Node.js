# Scenario

You are running a Baby Hospital and you want to have a system that can manage all baby's information.

Currently, you are the only employee. So you won't do any authentication system and running whole system on your local machine at first.

And someone already finished the Front End code, you just need to finish the Back End code right now.

## Before Coding

* Make sure you have installed node.js on your system.
* Make sure you have editors can write code.

## Getting Started

The source cod will be located in the dir `./backend` and ALL OF THIS TUTORIAL command shown need to execute in dir `./backend` too.

So for now...the system will able to....

* Receive a all baby's information and make a list.
  * route `GET /api/baby`
* Create a new baby record in database.
  * route `POST /api/baby`
* Update a specific baby's information in database.
  * route `PUT /api/baby/:babyId`
* Receive a specific baby's information and show in GUI.
  * route `GET /api/baby/:babyId`
* Remove a specific baby's information which older than 6 years old.
  * route `DELETE /api/baby/:babyId`


### Express.js

https://github.com/expressjs/express

We will use this JavaScript framework to handle the router requirements.

Run the following command to install the Express.js

`npm install --save express`


Then create `index.js` and use the hello world example at first

```javascript
const express = require('express')
const app = express()
const port = 1145

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Then `node index.js`, to test run, make sure node.js and express are currently working.

If you can't not see those message, go back to Before Coding

```javascript
➜  backend node index.js
Example app listening on port 1145
```


### So what is a Baby?

Before we code anything else about baby, we need to think 

* What is a baby?
* When will you enter the baby's information to the system?
  * I would like to enter the baby's information right after they born.
  * So some of information may not be available at that time.
* What information should a baby carried?
  * For example, we want to storage those information which depends on A baby.
    * gender (*)
    * weight (*)
    * name
    * parent
  * Like we talked about before, some information may not be available for now
    * Maybe we don't know the parent yet
    * Maybe we don't know the name yet
    * But for the biological gender and weight, Surely we should know!
    * So that's why those column marked with "*" which means those information are required to fill while you entering those information.

### Here is the Baby schema
```javascript
{
  gender: '', // String *
  weight: '', // Number *
  name: '', // String
  parent: '', // String
}
```

## Now we are starting to code!

### `POST /api/baby`

We are going to create a baby by this route, and we will storage the information in memory for now.

So we going to define a variable to do that, by any line before baby routes add this line

```javascript
var BABY = []

app.post('/api/baby', (req, res) => {
  var baby = req.body 
  BABY.push(baby)
  res.json(baby)
})
```

That it for now! Then go to Postman to send the baby information to create.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/001.jpg?raw=true)

## `GET /api/baby`

And we want to know if the baby information have been successfully stored or not.

So you making the baby list right now.

```javascript
var BABY = []

app.get('/api/baby', (req, res) => {
  res.json(BABY)
})
```

And use Postman to do the request too.

### WTF? Someone hacked me?


![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/002.jpg?raw=true)


Let's why we need validation!




