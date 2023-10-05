const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://reinhardtstrausswebdev:g1KyhnAcpI6GY3FX@cluster0.u4r4g4p.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


//////////////////////////////////////////////////////////////////////////


const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({ name: "Reinhardt", age: 38, favoriteFoods: ["burger"] })
  person.save(function(err, data) {
    done(err, data);
  });
};

const arrayOfPeople = [{
  name: "Mark Zuckerberg",
  age: 22,
  favoriteFoods: ["pizza"]
}, {
  name: "Bill Gates",
  age: 23,
  favoriteFoods: ["haggis"]
}, {
  name: "Larry Page",
  age: 24,
  favoriteFoods: ["french fries"]
}]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.log(err)

    done(null, data)

  })
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    done(err, data);
  })

};



const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.log(err)

    done(null, data)
  })
};



const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    done(err, data);
  })
};



const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    data.save((err, newData) => {
      done(err, newData);
    })
  })

};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
    if (err) return console.log(err)

    done(null, updatedPerson)
  })
};



const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    done(err, data);
  })
};



const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove}, (err, data) => {
    if(err) return console.log(err)

    done(null, data)
  })
};


const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort("name")
    .limit(2)
    .select(["name", "favoriteFoods"])
    .exec((err, data) => {
    done(err, data)
  })
};




/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
