var express = require("express");
var router = express.Router();
var firbaseAdminDb = require("../connections/firebase_admins");

const ref = firbaseAdminDb.ref("text");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/post", function(req, res, next) {
  res.render("post", { title: "Express" });
});

/**
 * dashboard
 */
router.get("/dashboard/signup", function(req, res, next) {
  res.render("dashboard/signup", { title: "Express" });
});

module.exports = router;
