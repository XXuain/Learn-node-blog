const express = require("express");
const router = express.Router();
const firbaseAdminDb = require("../connections/firebase_admins");

// firebase 路徑
const categoriesRef = firbaseAdminDb.ref("/categories/");
const articlesRef = firbaseAdminDb.ref("/articles/");

router.get("/archives", (req, res, next) => {
  res.render("dashboard/archives", { title: "Express" });
});

/**
 * 文章管理
 */
// 新增文章頁面
router.get("/article/create", (req, res, next) => {
  // 取得所有分類
  categoriesRef.once("value").then(snapshot => {
    const categories = snapshot.val();
    res.render("dashboard/article", { categories });
  });
});

// 新增文章
router.post("/article/create", (req, res, next) => {
  const data = req.body;
  const articleRef = articlesRef.push();
  const key = articleRef.key;
  const updateTime = Math.floor(Date.now() / 1000);
  data.id = key;
  data.updateTime = updateTime;
  console.log(data);
  articleRef.set(data).then(() => {
    res.redirect("/dashboard/article/create");
  });
});

/**
 * 類別管理
 */
// 類別頁面
router.get("/categories", (req, res, next) => {
  const msg = req.flash("info");
  // 取得資料
  categoriesRef.once("value").then(snapshot => {
    const categories = snapshot.val();
    const resData = { categories, hasInfo: msg.length > 0, msg };
    res.render("dashboard/categories", resData);
  });
});

// 新增類別
router.post("/categories/create", (req, res) => {
  const data = req.body;

  // 取得單一類別
  const categoryRef = categoriesRef.push();
  const key = categoryRef.key;

  // 檢查欄位 path 是否有重複
  categoriesRef
    .orderByChild("path")
    .equalTo(data.path)
    .once("value")
    .then(snapshot => {
      if (snapshot.val()) {
        req.flash("info", "已有相同路徑");
        res.redirect("/dashboard/categories");
      } else {
        data.id = key;
        categoryRef.set(data).then(() => {
          res.redirect("/dashboard/categories");
        });
      }
    });
});

// 刪除
router.post("/categories/delete/:id", (req, res) => {
  const id = req.params.id;
  categoriesRef.child(id).remove();
  req.flash("info", "欄位已刪除");
  res.redirect("/dashboard/categories");
});

module.exports = router;
