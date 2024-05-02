# CRUD With Database


## Read action
Now we are heading to the read action, put this part in index.js anywhere above `console.log('Connecting to database')`

```js
app.get('/api/baby/:babyId', async (req, res) => {
  try {
    // We need to wrap the input id with mongoose.ObjectId
    // Otherwise the query won't work
    var _id = new mongoose.Types.ObjectId(req.params.babyId)

    // Then we can find the specific record with _id
    var baby = await Baby.findOne({_id})

    // This is same as 
    // var baby = await Baby.findOne({_id: _id})
    // See more 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

    // If found, output the record
    res.json(baby)
  } catch (error) {
    // If not found, it will cause error
    res.status(400).json({
      message: error.message
    })
  }
})
```

Test with Postman, you should be able to see the results like this which means baby creation is a success.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/006.jpg?raw=true)

If not, go back to check any error message or previous steps

## Update action

Okay, after read action, now we can do the update, because for frontend development, they need the fetch the current resources that you want to edit to the interface, then send the edited result back

So we need to finish the Read action first.

### But why do we need a update action?

Remember the baby model that we designed before? Some information may not be available when we created the baby. So what happend if we have the information just now, and how to update the baby record?

That's what update action does!

---

And this is a update action looks like.

```js
app.put('/api/baby/:babyId', async (req, res) => {
  try {
    var baby = await Baby.findOneById(req.params.babyId)

    // This is some kind of allow list
    // Because req.body may contains other information that we don't want
    baby.name = req.body.name
    baby.parent = req.body.parent
    baby.birthAt = req.body.birthAt
    baby.gender = req.body.gender
    baby.weight = req.body.weight

    await baby.save()
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})
```

Update action should be like this, but you must notice that we need going to do the same check as create action again, and.... are we going to copy whole check conditions codes to here?

No....we write another function to wrap every validation condition together.

```js
function BabyValidator(baby){
  // We define an error variable to storage error message
  var error = false

  // If date parse failed, it will return NaN ( Not a Number)
  // We can use JavaScript builtin function "isNaN" to check
  if(isNaN(Date.parse(baby.birthAt))) {
    // If enter this condition, assign the error message to the error variable
    error = 'Birth Time must be a Date'
  }

  // We define an 'Allow list' here
  var BIOLOGICAL_GENDER_LIST = ['male', 'female']

  // Then we convert the input baby gender string into lower case.
  var baby_gender_to_check = baby.gender.toLowerCase()

  // Check if the BIOLOGICAL_GENDER_LIST includes baby_gender_to_check or not
  if (BIOLOGICAL_GENDER_LIST.includes(baby_gender_to_check) == false) {
    // Do the same as above
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
    // Do the same as above
    error = `Baby's weight must be between 0 ~ ${MAX_BABY_WEIGHT}g`
  }

  return error
}
```


Now the complete update action should looks like this.

```js
app.put('/api/baby/:babyId', async (req, res) => {
  try {
    // Use find the ObjectId as read action too.
    var _id = new mongoose.Types.ObjectId(req.params.babyId)
    var baby = await Baby.findOne({_id})

    // This is some kind of allow list
    // Because req.body may contains other information that we don't want
    // We just update the baby model instance here, and save back to Database later.
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


    // If it passes the validation, saves back to Database.
    await baby.save()

    // Then finish the request.
    return res.json(baby)
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})
```

And the create action.

```javascript
app.post('/api/baby', (req, res) => {
  var baby = req.body
  var error = BabyValidator(req.body)

  if(error) {
    return res.status(400).json({
      message: error
    })
  }

  Baby.create(baby).then(_ => {
    return res.json(baby)
  })

})
```

Now we should be able to the edit the baby's information.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/007.jpg?raw=true)

Next [Final Action and.....more!](./005_final_action_and_more.md)

---

Back to [Connect to database](./003_connect_to_database.md)
