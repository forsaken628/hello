/**
 * Created by forsa on 2016-10-27.
 */
const express = require('express');
const bodyParser = require('body-parser');
const site = require('./controller/site');
const data = require("./controller/data");
const api = require("./controller/api");
const authentication = require('express-authentication')();
const auth = require("./model/auth");

const router = express.Router();

// var common = authentication.for("common").use(auth.session).required();
// var ajax = authentication.for("ajax").use(auth.session).required();
var common, ajax;
common = ajax = function (req, res, next) {
    next();
};

router.get("/", common, site.main);

router.use("/site", common);

router.get("/site/index", site.index);
router.get("/site/classes", site.classes);
router.get("/site/courses", site.courses);
router.get("/site/error", site.error);
router.get("/site/users", site.users);
router.get("/site/venues", site.venues);

router.use("/table", ajax);

router.get("/table/users", data.users);
router.get("/table/classes", data.classes);
router.get("/table/courses", data.courses);
router.get("/table/venues", data.venues);

router.get("/data/calendar", ajax, data.calendar);

router.get("/login", site.login);
router.post("/login", bodyParser.urlencoded({extended: true}), auth.byUsername);

router.get("/logout", common, auth.logout);

router.use(api);

module.exports = router;