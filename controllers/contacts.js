const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const db = mongodb.getDatabase();
  const results = await db.db().collection("contacts").find();
  results.toArray().then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const db = mongodb.getDatabase();
  const result = await db.db().collection("contacts").find({ _id: userId });
  result.toArray().then((user) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user[0]);
  });
};

module.exports = {
  getAll,
  getSingle,
};
