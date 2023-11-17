const express = require("express");
const { index, create, find, update, destroy } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const router = express();

router.get("/", authenticateUser, index);
router.get("/:id", authenticateUser, find);
router.post("/", authenticateUser, create);
router.put("/:id", authenticateUser, update);
router.delete("/:id", authenticateUser, destroy);

module.exports = router;
