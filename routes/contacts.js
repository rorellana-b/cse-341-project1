const express = require("express");
const router = express.Router();

const usersController = require("../controllers/contacts");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);

//activity 2
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
