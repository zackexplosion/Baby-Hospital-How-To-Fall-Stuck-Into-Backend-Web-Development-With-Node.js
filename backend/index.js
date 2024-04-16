// We will inject DB_URI from environment variable
// There are several different ways to achieve this
// You even can replace process.env.DB_URI with string.
// But for now, I want to hide my server from public.
// So I will inject the DB_URI variable from environment 
const DB_URI  = process.env.DB_URI

// Dependencies
const mongoose = require('mongoose')
const express = require('express')
const app = express()

// App listen port
const port = 1145

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
      We use the new option 'default' here
      which means "If no value is provided, the value define here will be used".

      We want every baby create in here mark as NOT deleted.
      So use `default: false` here.

      And this flag will be Boolean type.
      */
      markAsDeleted: { type: Boolean, default: false}
  })
)

// This is for express to handle request with json payload
// If without this, req.body will be empty.
// https://expressjs.com/en/api.html#express.json
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// var BABY = []

app.delete('/api/baby/:babyId', async (req, res) => {
  // We need to wrap the input id with mongoose.ObjectId
  // Otherwise the query won't work
  var _id = new mongoose.Types.ObjectId(req.params.babyId)

  // Then set the `markAsDeleted` attribute to TRUE
  // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
  await Baby.findByIdAndUpdate(_id, {
    markAsDeleted: true
  })

  // We don't really need to let the client know what were we doing here.
  return res.json({
    message: 'Delete Successfully.'
  })
})

app.get('/api/baby/:babyId', async (req, res) => {
  try {
    // We need to wrap the input id with mongoose.ObjectId
    // Otherwise the query won't work
    var _id = new mongoose.Types.ObjectId(req.params.babyId)

    // Then we can find the specific record with _id
    var baby = await Baby.findOne({_id})
    // And this is same as 
    // var baby = await Baby.findOne({_id: _id})
    // See more https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

    // If found, output the record
    res.json(baby)
  } catch (error) {
    // If not found, it will cause error
    res.status(400).json({
      message: error.message
    })
  }
})

app.put('/api/baby/:babyId', async (req, res) => {
  try {
    // Use find the ObjectId as read action too.
    var _id = new mongoose.Types.ObjectId(req.params.babyId)
    var baby = await Baby.findOne({_id})

    // This is some kind of allow list
    // Because req.body may contains other information that we don't want
    // We just update the baby model instance here, and save to Database later.
    baby.name = req.body.name
    baby.parent = req.body.parent
    baby.birthAt = req.body.birthAt
    baby.gender = req.body.gender
    baby.weight = req.body.weight

    // Run the validator
    var error = BabyValidator(baby)

    if(error) {
      return res.status(400).json({
        message: error
      })
    }


    // If pass the validation, save to Database.
    await baby.save()

    // Then finish the request.
    return res.json(baby)
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

function BabyValidator(baby){
  var error = false
  // If date parse failed, it will return NaN ( Not a Number)
  // We can use JavaScript builtin function "isNaN" to check
  if(isNaN(Date.parse(baby.birthAt))) {
    error = 'Birth Time must be a Date'
  }

  // We define an 'Allow list' here
  var BIOLOGICAL_GENDER_LIST = ['male', 'female']

  // Then we convert the input baby gender string into lower case.
  var baby_gender_to_check = baby.gender.toLowerCase()

  // Check if the BIOLOGICAL_GENDER_LIST includes baby_gender_to_check or not
  if (BIOLOGICAL_GENDER_LIST.includes(baby_gender_to_check) == false) {
    error = "We need baby's biological gender here!"
  } else {
    // If it's in the list, rewrite the object going to write.
    // Because the input gender may be upper case.
    baby.gender = baby_gender_to_check
  }

  // Hm....I don't know much weight can a baby be
  // Let's assume less in 10000g here
  // You can change the limit as you want lol
  const MAX_BABY_WEIGHT = 10000
  var babyWeight = parseFloat(baby.weight)
  if(babyWeight <= 0 || babyWeight >= MAX_BABY_WEIGHT) {
    error = `Baby's weight must be between 0 ~ ${MAX_BABY_WEIGHT}g`
  }

  return error
}

app.post('/api/baby', (req, res) => {
  var baby = req.body

  var error = BabyValidator(baby)

  if(error) {
    return res.status(400).json({
      message: error
    })
  }

  Baby.create(baby).then(_ => {
    return res.json(baby)
  })

})

app.get('/api/baby', async (req, res) => {

  /*
  We want to filter the records by `markAsDeleted: false` 
  Which means we want the records never been delete yet.
  */
  var babyList = await Baby.find({
    markAsDeleted: false
  })

  return res.json(babyList)
})


console.log('Connecting to database')
mongoose.connect(DB_URI).then(_ => {
  console.log('Database connected, now starting app')
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
})

