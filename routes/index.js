const express = require("express");
const router = express.Router();
const firbaseAdminDb = require("../connections/firebase_admins");
const stringtags = require("striptags");
const moment = require("moment");

// firebase 路徑
const categoriesRef = firbaseAdminDb.ref("/categories/");
const articlesRef = firbaseAdminDb.ref("/articles/");

/* GET home page. */
router.get("/", function(req, res, next) {
  let categories = {};
  let articles = []; // 以陣列呈現 方便分頁製作
  // 取得所有分類
  categoriesRef
    .once("value")
    .then(snapshot => {
      categories = snapshot.val();
      // 取得所有文章
      return articlesRef.once("value");
    })
    .then(snapshot => {
      snapshot.forEach(item => {
        item.val().status === "public" && articles.push(item.val());
      });
      articles.reverse();
      console.log(articles, categories);
      res.render("index", { categories, articles, stringtags, moment });
    });
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
