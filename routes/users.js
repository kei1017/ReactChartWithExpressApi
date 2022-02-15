var express = require("express"),
  router = express.Router(),
  controller = require("../controllers/auth.controller.js");

router.get("/user", controller.getUsers);
router.get("/user/:id", controller.getUserById);
router.post("/user", controller.createUser);
router.put("/user/:id", controller.updateUser);
router.delete("/user/:id", controller.deleteUser);
router.post("/auth", controller.authUser);
router.post("/filtered-data", controller.getData);

module.exports = router;
