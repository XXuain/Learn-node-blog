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
      articles.reverse(); // 取新->舊
      /**
       * [ 分頁功能 ]
       * - 總共有幾筆資料 totalResult
       * - 總共有幾頁 totalPages
       * - 每頁有幾筆 perpage
       * - 目前在第幾頁 currentPage
       * - 當前頁面資料
       *  */
      const totalResult = articles.length;
      const perpage = 2; // 每頁有幾筆
      const totalPages = Math.ceil(totalResult / perpage); // 無條件進位
      let currentPage = Number.parseInt(req.query.page) || 1; // 當前頁數 不會比總頁數多
      currentPage > totalPages && (currentPage = totalPages);

      const minItem = currentPage * perpage - perpage + 1; //3
      const maxItem = currentPage * perpage; //4

      const resultData = [];
      articles.forEach((item, i) => {
        let num = i + 1;
        num >= minItem && num <= maxItem && resultData.push(item);
      });

      // 畫面分頁需要的數值
      const page = {
        totalPages,
        currentPage,
        hasPre: currentPage > 1,
        hasNext: currentPage < totalPages
      };
      res.render("index", { categories, articles: resultData, page, stringtags, moment });
    });
});

router.get("/post", function(req, res, next) {
  res.render("index", { categories, articles, stringtags, moment });
  res.render("post", { title: "Express" });
});

/**
 * dashboard
 */
router.get("/dashboard/signup", function(req, res, next) {
  res.render("dashboard/signup", { title: "Express" });
});

module.exports = router;
