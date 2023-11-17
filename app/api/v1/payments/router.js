const express = require("express");
const { authenticateUser } = require("../../../middlewares/auth");
const { index, update, destroy, find, create } = require("./controller");
const router = express();

router.get("/", authenticateUser, index);
router.get("/:id", authenticateUser, find);
router.put("/:id", authenticateUser, update);
router.delete("/:id", authenticateUser, destroy);
router.post("/", authenticateUser, create);
module.exports = router;
