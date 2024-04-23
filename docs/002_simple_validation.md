# Validation

Remember last chapter we have seen many strange data that are written into Baby table. 

It is because we do nothing before writing into the data.

So anyone ...even yourself may enter wrong data into the system.

and ..... ANYTHING FROM THE INTERNET CAN NOT BE TRUSTED.

So we have to do some checks before saving data action.

## Back to the create action

```javascript
app.post('/api/baby', (req, res) => {
  var baby = req.body

  // If date parse failed, it will return NaN ( Not a Number)
  // We can use JavaScript builtin function "isNaN" to check
  if(isNaN(Date.parse(baby.birthAt))) {
    return res.status(400).json({
      'message': 'Birth Time must be a Date'
    })
  }

  // Write into the storage object and return 
  BABY.push(baby)
  // Make sure exit this current function
  return res.json(baby)
})
```

Then confirm with Postman, remove the birthAt attribute and do the request, should show the error message.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/003.jpg?raw=true)

And put the birthAt attribute back, it should write successfully.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/004.jpg?raw=true)

## Then complete other attributes and do the checks above again and again.

```javascript
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
    return res.status(400).json({
      'message': `Baby's weight must be between 0 ~ ${MAX_BABY_WEIGHT}g`
    })
  }

  // Write into the storage object and return 
  BABY.push(baby)
  return res.json(baby)
})
```

# Summary

So far, our system should be able to check the input data simply, but you must have found an issue right now.

Why is every time I changed the source code and restart the app, all baby were gone?

We haven't yet finished the delete function. LOL

It is because our baby table just a storage with the BABY variable currently which only lives while application is alive. When you restart the app, it means all data within application lifecycle will be erased.

That's why we need a [Database](./003_connect_to_database.md)! to store our baby table!

---

Back to [001 Start Coding](../001_start_coding.md)


