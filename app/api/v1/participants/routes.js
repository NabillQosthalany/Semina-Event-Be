const express = require("express");
const router = express();
const {
  getAllLandingPage,
  getDetailLandingPage,
  signup,
  signin,
  activeParticipant,
  getAllPayment,
  checkout,
  dashboard,
} = require("./controller");
const { authenticateParticipant } = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/active", activeParticipant);
router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);
router.get("/payments/:organizer", authenticateParticipant, getAllPayment);
router.post("/checkout", authenticateParticipant, checkout);
router.get("/orders", authenticateParticipant, dashboard);

module.exports = router;
