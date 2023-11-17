const express = require("express");
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("organizer", "admin"),
  create
);
router.get(
  "/:id",
  authenticateUser,
  authorizeRoles("organizer", "admin"),
  find
);
router.get("/", authenticateUser, authorizeRoles("organizer", "admin"), index);
router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("organizer", "admin"),
  update
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("organizer", "admin"),
  destroy
);

module.exports = router;
