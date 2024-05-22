const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./db");
const { ObjectId } = require("mongodb");

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("listdb").collection("list");
  return collection;
};

// GET /list
// show list from mongodb
router.get("/list", async (req, res) => {
  const collection = getCollection();
  const list = await collection.find().toArray();

  res.status(200).json(list);
});

// POST /list
//add list to mongodb
router.post("/list", async (req, res) => {
  const collection = getCollection();
  const { list } = req.body;

  const newList = await collection.insertOne({ list, status: false });

  // if there is no list, show a message
  if (!list) {
    return res.status(400).json("ERROR: no list found");
  }

  list = JSON.stringify(list);

  res.status(201).json({ list, status: false, _id: newList.insertedId });
});

// DELETE /list:id
router.delete("/list/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedList = await collection.deleteOne({ _id });

  res.status(200).json({ deletedList });
});

// PUT /list:id
// update list
router.put("/list/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json("Invalid status");
  }

  const updatedList = await collection.updateOne(
    { _id },
    { $set: { status: !status } }
  );

  res.status(200).json({ updatedList });
});

module.exports = router;
