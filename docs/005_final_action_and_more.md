# Final Action And More!

We are going to finish the DELETE action and which is the Final Action of the Chapter!

Put the following code in `index.js` above `app.listen`

```javascript
app.delete('/api/baby/:babyId', async (req, res) => {
    // We need to wrap the input id with mongoose.ObjectId
    // Otherwise the query won't work
    var _id = new mongoose.Types.ObjectId(req.params.babyId)

    // Then delete the record in the database
    // https://mongoosejs.com/docs/5.x/docs/api/model.html#model_Model.findByIdAndDelete
    await Baby.findByIdAndDelete(_id)

    return res.json({
      message: 'Delete Successfully.'
    })
})
```

Now you should able to delete the record in the database!

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/008.jpg?raw=true)

Congratulations! That's all! You finished all the CRUD actions!


## What's "More"?


We just finished the delete action right?

But... what if you find out, there was some records deleted by accident?

And we just actually deleted them from Database!

Which means "It's hard to rescue"!

Therefore, we are going to add a flag called `markAsDeleted` to our baby model schema.

Change the schema like this.

```js
const Baby = mongoose.model(
  "Baby",
  new mongoose.Schema({
      name: { type: String},
      gender: {type: String },
      parent: { type: String},
      weight: { type: Number },
      birthAt: { type: Date},
      /* 
      We use the new option 'default' here,
      Which means "If no value is provided, the value define here will be used."
      We want every baby create in here mark as NOT deleted.
      So use default: false here.
      */
      markAsDeleted: { type: Boolean, default: false}
  })
)
```

And change the delete action code like this.


```js
app.delete('/api/baby/:babyId', async (req, res) => {
    // We need to wrap the input id with mongoose.ObjectId
    // Otherwise the query won't work
    var _id = new mongoose.Types.ObjectId(req.params.babyId)

    // Then set the `markAsDeleted` attribute to TRUE
    // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
    await Baby.findByIdAndUpdate(_id, {
      markAsDeleted: true
    })

    // We don't really need to let the client know what were we doing here. Just let them now the record have been deleted.
    return res.json({
      message: 'Delete Successfully.'
    })
})
```

Then change the READ action like this which I also rewrite with async/await too.

See more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

```js
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
```

Then try to delete something from the GUI, you should see the record deleted as original action.

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/009.jpg?raw=true)

But.... open the database management tool, you should see.....

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/010.jpg?raw=true)

The record is not really deleted! It just `markAsDeleted: true`!

Looks familiar right?

Da! This is how to implement the `Trash Can` function. 😊

## What's next?

If you are fully understand this chapter, you can go to next Chapter [Business Growing! New Requirement!](./010_business_growing_new_requirements.md)

If you have any questions to ask, you can open issue from here
https://github.com/zackexplosion/Baby-Hospital-How-To-Fall-Stuck-Into-Backend-Web-Development-With-Node.js/issues/new

---

Back to [CRUD With Database](./004_crud_with_database.md)
