/**
 * Created by forsa on 2016-10-28.
 */
const bcrypt = require('bcryptjs');

exports.session = function (req, res, next) {
    if (req.session.authenticated && req.session.authentication) {
        req.authenticated = true;
        req.authentication = req.session.authentication;
    } else {
        req.authenticated = false;
    }
    next();
};

exports.byUsername = function (req, res) {
    if (!req.body.username || !req.body.password) {
        req.authenticated = false;
        res.redirect("/login");
    }
    req.db.model("yzj_user").findOne({
        where: {
            username: req.body.username
        }
    }).then(function (result) {
        if (bcrypt.compareSync(req.body.password, result.hash)) {
            req.authenticated = true;
            req.authentication = result;
            req.session.authenticated = true;
            req.session.authentication = req.authentication;
            res.redirect("/");
        } else {
            req.authenticated = false;
            res.redirect("/login");
        }
    });
};

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect("/login");
};