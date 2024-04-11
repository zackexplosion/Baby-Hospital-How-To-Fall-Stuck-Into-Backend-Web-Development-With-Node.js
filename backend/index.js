const express = require('express')
const app = express()
const port = 1145


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


var BABY = []

app.post('/api/baby', (req, res) => {
  var baby = req.body

  console.log(req.body)
  BABY.push(baby)
  res.json(baby)
})

app.get('/api/baby', (req, res) => {
  res.json(BABY)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})