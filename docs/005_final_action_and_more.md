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

Now you should able the delete the record in the database!

![](https://github.com/zackexplosion/Baby-Hospital/blob/main/screenshots/008.jpg?raw=true)

Congratulations! That's all! You finished all the CRUD actions!


## What's "More"?


We just finished the delete action right?

But... what if you find out, there was some records deleted by accident?

And we just actually deleted from Database!

Which means it's hard to "rescue"!

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
      Which means "If no value is provided, which value will be used."
      We want every baby create in here mark as NOT deleted.
      So use default: false here.
      */
      markAsDeleted: { type: Boolean, default: false}
  })
)
```

And change the delete action code like this.