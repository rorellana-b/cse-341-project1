const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags = ['Hello Ronal']
  res.send("Hello Ronal");
});

router.use("/contacts", require("./contacts"));

module.exports = router;
