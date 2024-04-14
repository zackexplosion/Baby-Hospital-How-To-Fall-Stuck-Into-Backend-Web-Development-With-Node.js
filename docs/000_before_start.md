## Before Start

* Make sure you are able to understand how to do `run the command "npm install"`.
* Make sure you have installed node.js on your system.
  * https://nodejs.org/en/download
* Make sure you have any kind of editor which can writing code.
  * VsCode ( Which I am using ) https://code.visualstudio.com/ 
  * Sublime Text https://www.sublimetext.com/
  * ... Anything can edit text files.

## Run This Project

You can just run the command `npm install && npm run dev` in current directory to see the final result.

But I suggest you to remove the every files and directories in `backend` directory then follow the instructions.

## Basic Actions and Routes

For now...the system should able do to following actions and those actions will match with one specific route.

* Make a list about all baby's information.
  * route `GET /api/baby`
* Create a new baby record.
  * route `POST /api/baby`
* Update a specific baby's information.
  * route `PUT /api/baby/:babyId`
* Get a specific baby's information.
  * route `GET /api/baby/:babyId`
* Delete a specific baby's information.
  * route `DELETE /api/baby/:babyId`

If you have questions like ......

* Why router?
* Why do we design routes like that?
* Is this some kind of rules or something necessary?

Check this. [Why do we need routers even controllers?](../appendix_docs/why_do_we_need_routers_even_controllers.md)


### Install Express.js

We will use this JavaScript framework to handle the routing requirements.

So we need to run following command to install the Express.js to our project.

`npm install --save express`

Then create `index.js` in `backend` directory and copy following hello world example at first.

You can see more information about Express.js from here https://github.com/expressjs/express.

```javascript
// Some package requirements
const express = require('express')
const app = express()

// We will run this application on port 1145
// So the server will serve this url http://localhost:1145
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

Then run `node index.js` to  make sure node.js and express are working fine.

If you can not see those message, go back to Before Coding.

```javascript
➜  node index.js
Example app listening on port 1145
```

And if you visit the url http://localhost:1145, you should able to see this `Hello World` from server.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/000.jpg?raw=true)


If you saw those message. Let's go next chapter [Start Coding](./docs/001_start_coding.md)