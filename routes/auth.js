const express = require("express");
const router = express.Router();
const firebaseClient = require("../connections/firebase_client");
const firebaseAuth = firebaseClient.auth(); // 認證功能
const firbaseAdminDb = require("../connections/firebase_admins");

// 註冊頁面
router.get("/signup", (req, res) => {
  const msg = req.flash("info");
  res.render("dashboard/auth", { type: "signup", hasInfo: msg.length > 0, msg });
});

// 登入頁面
router.get("/signin", (req, res) => {
  const msg = req.flash("info");
  res.render("dashboard/auth", { type: "signin", hasInfo: msg.length > 0, msg });
});

// 註冊 api
router.post("/signup", (req, res, next) => {
  const { email, password, confirmPassword, nickName } = req.body;
  if (password !== confirmPassword) {
    req.flash("info", "確認密碼錯誤");
    res.redirect("/auth/signup");
    return;
  }
  firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      const saveUser = {
        uid: user.user.uid,
        email,
        password,
        nickName
      };
      firbaseAdminDb.ref(`/users/${user.user.uid}`).set(saveUser);
      // 註冊成功至登入頁
      res.redirect("/auth/signin");
    })
    .catch(err => {
      let msg = err.code === "auth/email-already-in-use" ? "email 已存在" : "輸入錯誤";
      req.flash("info", msg);
      res.redirect("/auth/signup");
    });
});

// 登入 api
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user.user.uid);
      // 紀錄 session
      req.session.uid = user.user.uid;
      res.redirect("/auth/admin");
    })
    .catch(err => {
      req.flash("info", err.message);
      res.redirect("/auth/signin");
    });
});

// 登入成功
router.get("/admin", (req, res) => {
  const auth = req.session.uid;
  auth ? res.render("dashboard/admin", { auth }) : res.redirect("/auth/signin");
});

module.exports = router;
