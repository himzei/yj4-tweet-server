"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.auth = void 0;
var _app = require("firebase/app");
var _auth = require("firebase/auth");
var _storage = require("firebase/storage");
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};
var app = (0, _app.initializeApp)(firebaseConfig);
var auth = exports.auth = (0, _auth.getAuth)(app);
var storage = exports.storage = (0, _storage.getStorage)(app);