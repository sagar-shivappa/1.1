const { MongoClient } = require("mongodb");
const mongo_url = "mongodb://localhost:27017";
const dbName = "students";
var db;

//Immediately invoked function, function is caklled immediatly without calling its name

// (async () => {
//   try {
//     //connecting MongoDB
//     const client = new MongoClient(mongo_url);
//     await client.connect();
//     console.log("MongoDB Connected");

//     //Selecting the DB
//     db = await client.db(dbName);
//     console.log(`selected DB Name - ${dbName}`);

//     //Trying to Read data
//     // const posts = await db.collection("posts").find().toArray();
//     // console.log(posts);
//   } catch (error) {
//     console.log("error while connecting DB");
//   }
// })();

const mongo = {
  db: null,
  async connect() {
    try {
      //connecting MongoDB
      const client = new MongoClient(mongo_url);
      await client.connect();
      console.log("MongoDB Connected");

      //Selecting the DB
      this.db = await client.db(dbName);
      console.log(`selected DB Name - ${dbName}`);

      //Trying to Read data-sample
      // const posts = await db.collection("posts").find().toArray();
      // console.log(posts);
    } catch (error) {
      this.db = null;
      console.log("error while connecting DB");
      process.exit();
    }
  },
};

module.exports = mongo;
