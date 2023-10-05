require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
const mongoClient = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectMongo() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB successfully!');
  } finally {
    // Uncomment the next line if you want to close the MongoDB connection after running the script.
    // await mongoClient.close();
  }
}

// Run MongoDB connection function
connectMongo().catch(console.error);

// Mongoose Connection
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//L
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
