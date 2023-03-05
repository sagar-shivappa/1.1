// Node JS without Express------------

// console.log("Welcome to Node jS");
// global.name = "sagar";
// // console.log(global);\
// const http = require("http");
// const users = require("./users.json");

// const server = http.createServer((req, res) => {
//   if (req.url === "/users" && req.method === "GET") {
//     res.write(JSON.stringify(users));
//     res.end();
//   } else {
//     res.write("Invalid URL");
//     res.end();
//   }
// });
// server.listen(3001, () => {
//   console.log("Listening to Server 3001");
// });
//------------------------------------
const express = require("express");
const app = express();
// const users = require("./users.json");

//Importing Route
const userRoute = require("./routes/user.routes");

//Mongo Connection Info- This makes Sure that connection has happened before hitting API
const mongo = require("./shared/mongo");
mongo.connect();

// To add maintainance
const IS_MAINTAINANCE = false;

//PORT value
const PORT = 3001;
// It is required to Parse our Request body from string to JSON
app.use(express.json());

// MiddleWare in General -It will called for all the request made
app.use((req, res, next) => {
  console.log(Date.now()); // To take time of API hit

  if (IS_MAINTAINANCE) {
    res.send({ message: "Site is under manitainance", code: 200 });
    console.log("Site is under manitainance or DB not connected");
  } else if (mongo == undefined || mongo.db == null) {
    res.send({ message: "Site DB not connected", code: 200 });
  } else {
    console.log("DB Connected Successfully");
    next();
  }
});

app.use("/user", userRoute);

// MiddleWare specific to testPost
app.use("/testPost", (req, res, next) => {
  console.log("POST Middle ware");
  next();
});

// Initialising our port
app.listen(PORT, () => {
  console.log("Listening at 3001");
});
