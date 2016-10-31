/**
 * Created by forsa on 2016-10-27.
 */
var Promise = require("bluebird");

exports.main = function (req, res) {
    res.render("../view/main.ejs");
};

exports.login = function (req, res) {
    res.render("../view/login.ejs");
};

exports.index = function (req, res) {
    res.render("../view/index.ejs");
};

exports.login = function (req, res) {
    res.render("../view/login.ejs");
};

exports.classes = function (req, res) {
    res.render("../view/classes.ejs");
};

exports.courses = function (req, res) {
    Promise.join(
        req.db.model("yzj_teacher").findAll(),
        req.db.model("yzj_venue").findAll(),
        function (teachers, venues) {
            var teacher = [], venue = [];
            var i;
            for (i in teachers) {
                teacher.push(teachers[i].toJSON());
            }
            for (i in venues) {
                venue.push(venues[i].toJSON());
            }
            res.render("../view/courses.ejs", {teacher: teacher, venue: venue});
        });
};

exports.error = function (req, res) {
    res.render("../view/error.ejs");
};

exports.users = function (req, res) {
    res.render("../view/users.ejs");
};

exports.venues = function (req, res) {
    res.render("../view/venues.ejs");
};