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


var BABY = []

app.post('/api/baby', (req, res) => {
  var baby = req.body
  // If date parse failed, it will return NaN ( Not a Number)
  // We can use JavaScript builtin function "isNaN" to check
  if(isNaN(Date.parse(baby.birthAt))) {
    return res.status(400).json({
      'message': 'Birth Time must be a Date'
    })
  }

  // We define an 'Allow list' here
  var BIOLOGICAL_GENDER_LIST = ['male', 'female']

  // Then we convert the input baby gender string into lower case.
  var baby_gender_to_check = baby.gender.toLowerCase()

  // Check if the BIOLOGICAL_GENDER_LIST includes baby_gender_to_check or not
  if(BIOLOGICAL_GENDER_LIST.includes(baby_gender_to_check) == false) {

    // If NOT in the allowed list, return error message.
    return res.status(400).json({
      'message': "We need baby's biological gender here!"
    })
  }else {

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
    return res.status(400).json({
      'message': `Baby's weight must be between 0 ~ ${MAX_BABY_WEIGHT}g`
    })
  }

  // Write into the storage object and return 
  BABY.push(baby)
  res.json(baby)
})

app.get('/api/baby', (req, res) => {
  res.json(BABY)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})