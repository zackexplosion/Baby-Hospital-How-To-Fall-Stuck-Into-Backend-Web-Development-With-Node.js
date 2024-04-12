# So what is a Baby?

Before we code anything else about baby, we need to think 

* What is a baby?
  * A baby model should able to carry information about a individual baby.
* When will you enter the baby's information to the system?
  * I would like to enter the baby's information right after they born.
  * So some of information may not be available at that time.
* What information should a baby carried?
  * For example, we want to storage those information which depends on A baby.
    * birthAt (*)
    * gender (*)
    * weight (*)
    * name
    * parent
  * Like we talked about before, some information may not be available for now
    * Maybe we don't know the parent yet
    * Maybe we don't know the name yet
    * But for the birth time, biological gender and weight, Surely we should know!
    * So that's why those column marked with "*"
    * which means those information are required to fill while you entering those information.

## Here is the Baby schema
```javascript
{
  birthAt: "11/04/2024", //  Date Object * but String here for demo purposes
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

Why a baby can having no gender?

How can a baby without birthday?

How can a parent is a freaking 🤪 string


![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/002.jpg?raw=true)


Let's why we need [Validation](./002_simple_validation.md)!

---

Back to [README](../README.md)



