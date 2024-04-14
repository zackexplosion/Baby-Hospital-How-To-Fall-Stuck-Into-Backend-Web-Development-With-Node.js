# Why do we need routers even controllers?

Actually we don't really NEED!

Routers and Controllers just an abstract concept which makes the source code easier to manage
and easier to read.

## RESTFUL routes

CRUD, creation, read, update, delete, routes
NOW the route table should looks like this

```js
POST /god/createWord
GET /god/:worldId
PUT /god/:worldId
DELETE /god/:worldId
```

And :worldId works like this

When you enter the url `/god/id02PFywF683kUzrXK75EL` ,
then you can access the id `id02PFywF683kUzrXK75EL` by the object `req.params.worldId`

Which will return the id `id02PFywF683kUzrXK as string.


Some examples.


```javascript
// Assume we already have a world model

// router.js

const router = express.Router()

router.get('/god/:worldId', async (req, res) => {
  // READ the world information
  let world = await World.findById(req.params.worldId)
  res.json(world)
})

router.post('/god/createWorld', (req, res) => {
  // DO the world creation
  let world = await World.create(req.body)
  res.json(world)
})

router.put('/god/:worldId', (req, res) => {
  // DO the world modification
  let world = await World.findById(req.params.worldId)
  world = world.update(req.body)
  res.json(world)
})

router.delete('/god/:worldId', (req, res) => {
  // DO the world deletion
    let world = await World.findById(req.params.worldId)
    world = world.delete()
    res.send('')
})

module.exports = router
```


## Very old school routes

BUT!!!! we also can do all those actions above in one single GET route too

NOW the route table should looks like this


```javascript
GET /god2?create=true
GET /god2?getWorldInformation=true&worldId=A_WORLD_ID
GET /god2?updateWorld=true&worldId=A_WORLD_ID
GET /god2?deleteWorld=true&worldId=A_WORLD_ID

```

In the same route `/god2` can do anything! And the source code.

```javascript
app.get('/god2', async (req, res) => {
  if(req.query.create){
    // DO the world information
    let world = await World.create(req.body)
    res.json(world)
  } else if(req.query.getWorldInformation){
    // READ the world information
    let world = await World.findById(req.params.worldId)
    res.json(world)
  } else if(req.query.updateWorld){
    // DO the world modification
    let world = await World.findById(req.params.worldId)
    world = world.update(req.body)
    res.json(world)
  }else if(req.query.deleteWorld){
    // DO the world deletion
    let world = await World.findById(req.params.worldId)
    world = world.delete()
    res.send('')
  }
})
```

It just depends what you want, there is no good or bad.

And tou saw 2 examples can do the same job right?

The concept of Controller can be used in following scenario, but I think sometimes people just call those callback functions above as controller too.

# The tricky boss way🤪

So.....what if your boss wants both ways run on production too?

Are you going to write whole actions twice?

NO! NO! NO!

NEVER EVER let the computer do the EXACTLY SAME job with "copy and paste"

Here we are! Controllers!

```javascript

// We define all of the controller functions first
async function createWorldController(req, res){
  let world = await World.create(req.body)
  res.json(world)
}

async function readWorldFormationController(req, res){
  let world = await World.findById(req.params.worldId)
  res.json(world)
}

async function updateWorldController(req, res){
  let world = await World.findById(req.params.worldId)
  world = world.update(req.body)
  res.json(world)
}

async function deleteWorldController(req, res){
  let world = await World.findById(req.params.worldId)
  world = world.delete()

  // Usually after delete successfully, just return with 200 status code an output nothing.
  // And by default without specific status code, it will be 200.
  res.send('')

  // But.... of course everything is depends on the design
  // You and also return successfully message with json object too

  world.owner = "Comrade Sky Weed"

  res.json({
    'success': true,
    'message': `${world.owner}'s world have been deleted.`
  })

  // AND!!! DO NOT DO THIS in REAL WORLD
  // We can not output results TWICE in a single response
  // I mean, if you already call `res.send()` you can not call `res.json()` in next line.
  // It will cause errors!, cuz the output already sent to the client side!
}

// Then putin to the router

const router = express.Router()

router.post('/god/createWorld', createWorldController)
router.get('/god/:worldId', readWorldFormationController)
router.put('/god/:worldId', updateWorldController)
router.delete('/god/:worldId', deleteWorldController)

app.use(router)


// Finally, call those controllers with this way.
app.get('/god', async (req, res) => {
  if(req.query.create){
    // DO the world information
    createWorldController(req, res)
  } else if(req.query.getWorldInformation){
    // READ the world information
    readWorldFormationController(req, res)
  } else if(req.query.updateWorld){
    // DO the world modification
    updateWorldController(req, res)
  }else if(req.query.deleteWorld){
    // DO the world deletion
    deleteWorldController(req, res)
  }
})


```

Now the route table should looks like this.

```javascript
POST /god/createWord
GET /god/:worldId
PUT /god/:worldId
DELETE /god/:worldId

GET /god?create=true
GET /god?getWorldInformation=true&worldId=A_WORLD_ID
GET /god?updateWorld=true&worldId=A_WORLD_ID
GET /god?deleteWorld=true&worldId=A_WORLD_ID
```

And the server will serve for both ways.

See more https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller