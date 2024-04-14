
# Business Growing! New Requirement!

Okay..new story.

Our neighbor town's Baby Hospital were closing their business.

And you bought their business just with few bucks and some loves to baby.

Then, How do we migrate baby's information from their system to ours?

Luckily their former employee already exports their baby data into several JSON and CSV files and gave to you.

And we have no idea why they doing this. I mean separate data into different formats lol.

Here are the files.

## JSON

```JSON
[
  {
    "gender": "male",
    "birth_date": "01/01/2024",
    "birth_time": "11:11:11",
  },
  {
    "ID": "01/02/2024:09:09:09",
    "name": "Anne",
    "gender": "female",
    "weight": 1000,
  },
  { 
    "weight": 1500,
    "birth_time": "01/03/2024:10:10:10",
  }
]
```

## CSV

```csv
          , make, Gosha, 2024/09/17, 
01/02/2024:09:09:09, female, Anne, 01/02/2024, 1
```

And they told you. `We will transfer "4" baby to you.`

But why? Why there are 5 records totally? It must be something wrong!

## It Always Goes Wrong

Maybe they miss the validation, maybe their employee forgot those data already been output.
Maybe.......Maybe.......

Forget the reasons!

All we have to know is `This is our job now!`

Let's deal with this mass.

First.

Did you notice Anne? This baby from csv file seems familiar with some baby in JSON file.

And that baby without name in JSON file had a attribute "ID" with value "01/02/2024:09:09:09" which is same as Anne in CSV file and it looks like the birth date and time!

And Anne in CSV even shows birth date twice!

So we have enough reason to make sure those 2 records are refer to the same BABY!

Let's start coding! [Upload Files](./011_upload_files.md)

---

Back to [Table Of Contents](../README.md)