const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const db = mongodb.getDatabase();
  const results = await db.db().collection("contacts").find();
  results.toArray().then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const userId = new ObjectId(req.params.id);
  const db = mongodb.getDatabase();
  const result = await db.db().collection("contacts").find({ _id: userId });
  result.toArray().then((user) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user[0]);
  });
};

const createUser = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contact);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating contact.");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const db = mongodb.getDatabase();
  const result = await db
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while updating user.");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectId(req.params.id);

  const db = mongodb.getDatabase();
  const result = await db
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while deleting user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
