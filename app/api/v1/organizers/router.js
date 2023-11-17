const express = require("express");
const {
  createCMSOrganizer,
  createCMSUser,
  getCMSUsers,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express();

router.post("/", createCMSOrganizer);
router.post(
  "/users",
  authenticateUser,
  authorizeRoles("organizer"),
  createCMSUser
);
router.get("/users", getCMSUsers);

module.exports = router;
