const express = require("express");
const router = express.Router();

const { verifySignUp } = require("../middlewares");

const controller = require("../controllers/auth.controller");

router.use(function (req, res, next) {
  console.log("This endpoint is beign hit");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signup
);

router.post("/auth/signin", controller.signin);

module.exports = router;
