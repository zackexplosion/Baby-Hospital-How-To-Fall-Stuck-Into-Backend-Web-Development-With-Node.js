# Scenario

You are running a Baby Hospital and you want to have a system that can manage all baby's information.

Currently, you are the only one employee. So you won't do any authentication system and running whole system on your local machine at first.

And someone already finished the Front End code, you just need to finish the Back End code right now.

## Before Coding

* Make sure you have installed node.js on your system.
* Make sure you have editors can write code.

## Getting Started

You can just run the command `npm install && npm run dev` with this project to see the final result.

But I suggest you to create a new empty directory then follow the instructions.

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

So create a new directory go into then run the following command to install the Express.js

`npm install --save express`


Then create `index.js` and use the hello world example at first

```javascript
const express = require('express')
const app = express()
const port = 1145

// This is for express to handle request with json payload
// If without this, req.body will be empty.
// https://expressjs.com/en/api.html#express.json
app.use(express.json())

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

If you saw those message. Let's go next chapter [Start Coding](./docs/001_start_coding.md)