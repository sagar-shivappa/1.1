const route = require("express").Router();
const mongoConnection = require("../shared/mongo");

route.post("/testPost", (req, res) => {
  // thios is the place where the logic comes. which connects to the DB
  res.json({ body: req.body, code: 200 });
});

route.put("/update/:id/:name", (req, res) => {
  // this is the place where we update data logic comes. which connects to the DB
  //res.json({ body: req.body, code: 200 });
  // req.params
  // For Query params => req.query

  res.send({
    message: "Successfully Updated",
    id: req.params.id,
    name: req.params.name,
  });
});
route.delete("/delete/:id", (req, res) => {
  // thios is the place where the logic comes. which connects to the DB
  res.json({ body: `Deleting User ${req.params.id}`, code: 200 });
});

route.get("/users", async (req, res) => {
  try {
    const data = await mongoConnection.db.collection("posts").find().toArray();
    res.json(data);
  } catch (error) {
    res.send({ error: "Unable to fetch", db: db });
  }
});
module.exports = route;
