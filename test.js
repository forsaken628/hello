/**
 * Created by forsa on 2016-10-27.
 */
const url = require("url");
const express = require('express');
const session = require('express-session');
const authentication = require('express-authentication');
const Promise = require("bluebird");

var p = new Promise(function (s, e) {
    s(111);
}).then(function (result) {
    console.log(result, 1);
    throw new Error({err:"123456"});
}).then(function (result) {
    console.log(result, 2);
});


// var app = express();
//
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 900000
//     }
// }));
//
// app.use(function (req, res, next) {
//     req.aa = 6;
//     next();
// });
//
// app.use("/a", function (req, res, next) {
//     req.aa = 5;
//     next();
// });
//
// app.get("/a/1", function (req, res) {
//     res.end(req.aa.toString());
// });
//
// app.get("/a/2", function (req, res) {
//     res.end(req.aa.toString());
// });
//
// app.get("/login", function (req, res) {
//     res.end("login");
// });
// app.get("/logout", function (req, res) {
//     res.end("login");
// });
// app.get("/in", function (req, res) {
//     res.end("in");
// });
//
//
// app.listen(8089);
//const db = require("./db");
//const db2 = require("./db");
//console.log(db);

//console.log(db == db2);

//
//var cal = require("./controller/calendar");
//cal.calendar();

