# So what is a Baby?

Before we code anything else about baby, we need to understand 

* What is a baby?
  * A baby model should able to carry information about an individual baby.
* When will you enter the baby's information to the system?
  * I would like to enter the baby's information right after they are born.
  * So some of information may not be available at that time.
* What information should a baby carry?
  * For example, we want to store those information which depends on A baby.
    * birthAt (*)
    * gender (*)
    * weight (*)
    * name
    * parent
  * Like we talked about before, some information may not be available for now
    * Maybe we don't know the parent yet
    * Maybe we don't know the name yet
    * But for the birth time, biological gender and weight, Surely we should know!
    * So that's why those column marked with ( * )
    * Which means those information are required to fill while you entering those information.

## Here is the Baby schema
```javascript
{
  birthAt: "11/04/2024", //  Date Object * but String here is for demo purposes.
  gender: '', // String *
  weight: '', // Number *
  name: '', // String
  parent: '', // String
}
```

## Now we are starting to code!

### `POST /api/baby`

We are going to create a baby in this route, and we will store the information in memory FOR NOW.

So we are going to define a variable to do that, by any line before baby routes add this line

```javascript
var BABY = []

app.post('/api/baby', (req, res) => {
  var baby = req.body 
  BABY.push(baby)
  return res.json(baby)
})
```

That's it!  Go to Postman to send the baby information to create.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/001.jpg?raw=true)

## `GET /api/baby`

And we want to know if the baby information have been successfully stored or not.

So we are making the baby list right now.

```javascript
app.get('/api/baby', (req, res) => {
  res.json(BABY)
})
```

And use Postman to do the request too.

### WTF? Someone hacked me?

Why a baby can have no gender?

How can a baby without birthday?

How can a parent is a freaking 🤪 string


![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/002.jpg?raw=true)


Let's why we need [Validation](./002_simple_validation.md)!

---

Back to [Before Start](./000_before_start.md)



