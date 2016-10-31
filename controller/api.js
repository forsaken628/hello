/**
 * Created by forsa on 2016-10-28.
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

router.use("/api/v1", function (req, res, next) {
    if (req.method === "POST") {
        bodyParser.urlencoded({extended: true})(req, res, next);
    } else {
        next();
    }
});

router.post("/api/v1/user", function (req, res) {
    if (!/^[a-z0-9]{6,15}$/i.test(req.body.password)) {
        res.status(400).end();
    } else {
        var hash = bcrypt.hashSync(req.body.password);
        req.db.transaction({autocommit: false}, function (t) {
            var promise = req.db.model("yzj_user")
                .build(_.assign({hash: hash}, req.body), {transaction: t});
            return promise.validate().then(function (result) {
                if (result === null) {
                    return promise.save();
                } else {
                    throw result.errors;
                }
            }).then(function (result) {
                var model;
                switch (result.type) {
                    case 1:
                        model = req.db.model("yzj_admin");
                        break;
                    case 2:
                        model = req.db.model("yzj_teacher");
                        break;
                    case 3:
                        model = req.db.model("yzj_student");
                }
                var promise = model.build(_.assign(req.body, {id: result.id}), {transaction: t});
                return promise.validate().then(function (result) {
                    if (result === null) {
                        return promise.save();
                    } else {
                        throw result.errors;
                    }
                });
            }).then(function (result) {
                res.end();
            }).catch(function (err) {
                if (err instanceof Array) {
                    t.rollback();
                    res.status(400).end(err.toString());
                } else {
                    console.log(err);
                    res.end();
                    throw err;
                }
            });
        });
    }
});
//
// router.post("api/v1/user", function (req, res) {
//
// });
//
// router.post("api/v1/user", function (req, res) {
//
// });

module.exports = router;