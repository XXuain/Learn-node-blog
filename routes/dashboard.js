const express = require("express");
const router = express.Router();
const firbaseAdminDb = require("../connections/firebase_admins");

// 分類的 firebase 路徑
const categoriesRef = firbaseAdminDb.ref("/categories/");

router.get("/archives", function(req, res, next) {
  res.render("dashboard/archives", { title: "Express" });
});

router.get("/article", function(req, res, next) {
  res.render("dashboard/article", { title: "Express" });
});

/**
 * 類別管理
 */
// 路徑
router.get("/categories", function(req, res, next) {
  const msg = req.flash("info");
  // 取得資料
  categoriesRef.once("value").then(function(snapshot) {
    const categories = snapshot.val();
    const resData = { categories, hasInfo: msg.length > 0, msg };
    // console.log("resData: ", resData);
    res.render("dashboard/categories", resData);
  });
});

// 新增類別
router.post("/categories/create", function(req, res) {
  const data = req.body;

  // 取得單一類別
  const categoryRef = categoriesRef.push();
  const key = categoryRef.key;
  data.id = key;
  categoryRef.set(data).then(function() {
    res.redirect("/dashboard/categories");
  });
});

// 刪除
router.post("/categories/delete/:id", function(req, res) {
  const id = req.params.id;
  categoriesRef.child(id).remove();
  req.flash("info", "欄位已刪除");
  res.redirect("/dashboard/categories");
});

module.exports = router;
