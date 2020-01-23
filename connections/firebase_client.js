const firebaseClient = require("firebase");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "node-blog-c09fe.appspot.com",
  messagingSenderId: "1034250663849",
  appId: "1:1034250663849:web:1a2b2ecc6b3095520df6b8"
};

firebaseClient.initializeApp(firebaseConfig);

module.exports = firebaseClient;
