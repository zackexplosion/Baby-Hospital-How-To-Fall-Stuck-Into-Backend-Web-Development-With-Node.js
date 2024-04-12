# Validation

Remember last chapter we saw many strange data write into Baby table?

That because we do nothing before write into the data.

ANYTHING FROM INTERNET CAN NOT BE TRUST.

We have to do some check before actual write action.

## Back to the create action


```javascript
app.post('/api/baby', (req, res) => {
  var baby = req.body

  // If date parse failed, it will return NaN ( Not a Number)
  // We can use JavaScript builtin function "isNaN" to check
  if(isNaN(Date.parse(baby.birthAt))) {
    res.status(400).json({
      'message': 'Birth Time must be a Date'
    })
  }

  // Write into the storage object and return 
  BABY.push(baby)
  res.json(baby)
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
  res.json(baby)
})
```

# Summary

So far, our system should able to check the input date simply, but you must found a issue right now.

Why every time I changed the source code and restart the app, all baby were gone?

We even not finished the delete function yet lol.

Because currently, our baby table just storage with the BABY variable which only lives while whole application alive, when you restart the app, it means all data with application lifecycle will be erased.

That's why we need a [Database](./003_connect_to_database.md)! to storage our baby table!

---

Back to [Start Coding](../001_start_coding.md)


