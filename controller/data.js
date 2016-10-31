/**
 * Created by forsa on 2016-10-27.
 */
const calendar = require("../model/calendar");

function init(req) {
    var params = req.query;
    params.page = params.page || 1;
    if (params.sort) {
        if (params.sort.indexOf("-") === 0) {
            params.sort = [[params.sort.substring(1), "desc"]];
        } else {
            params.sort = [[params.sort, "asc"]];
        }
    } else {
        params.sort = "id"
    }
    return params;
}

exports.users = function (req, res) {
    var params = init(req);
    //if(params.type)
    var modal;
    switch (parseInt(params.type)) {
        case 1:
            modal = req.db.model("yzj_admin");
            break;
        case 2:
            modal = req.db.model("yzj_teacher");
            break;
        case 3:
            modal = req.db.model("yzj_student");
            break;
    }

    req.db.model("yzj_user").findAndCount({
        limit: parseInt(params["per-page"]),
        offset: params["per-page"] * (params.page - 1),
        where: {
            type: parseInt(params.type),
            is_disable: 0
        },
        order: params.sort,
        include: [modal]
    }).then(function (result) {
        var rows = [], row;
        for (var i in result.rows) {
            row = result.rows[i].toJSON();
            switch (row.type) {
                case 1:
                    row.admin_name = row.yzj_admin.admin_name;
                    delete row.yzj_admin;
                    break;
                case 2:
                    row.teacher_name = row.yzj_teacher.teacher_name;
                    delete row.yzj_teacher;
                    break;
                case 3:
                    row.student_name = row.yzj_student.student_name;
                    delete row.yzj_student;
                    break;
            }
            delete row.hash;
            delete row.auth_key;
            delete row.access_token;
            rows.push(row);
        }
        res.send(JSON.stringify({total: result.count, rows: rows}));
    });
};

exports.classes = function (req, res) {
    var params = init(req);
    req.db.model("yzj_classe").findAndCount({
        limit: parseInt(params["per-page"]),
        offset: params["per-page"] * (params.page - 1),
        order: params.sort,
        include: [req.db.model("yzj_student"), req.db.model("yzj_course")]
    }).then(function (result) {
        var rows = [], row;
        for (var i in result.rows) {
            row = result.rows[i].toJSON();
            row.students = row.yzj_students;
            row.studentCount = row.students.length;
            delete row.yzj_student;
            row.courses = row.yzj_courses;
            row.courseCount = row.yzj_courses.length;
            delete row.yzj_courses;
            rows.push(row);
        }
        res.send(JSON.stringify({total: result.count, rows: rows}));
    });
};

exports.courses = function (req, res) {
    var params = init(req);
    req.db.model("yzj_course").findAndCount({
        limit: parseInt(params["per-page"]),
        offset: params["per-page"] * (params.page - 1),
        order: params.sort,
        include: [
            {model: req.db.model("yzj_schedule"), include: [req.db.model("yzj_teacher"), req.db.model("yzj_venue")]},
            {model: req.db.model("yzj_classe"), include: [req.db.model("yzj_student")]}
        ]
    }).then(function (result) {
        var rows = [], row;
        for (var i in result.rows) {
            row = result.rows[i].toJSON();
            row.schedules = row.yzj_schedules;
            delete row.yzj_schedules;
            for (var j in row.schedules) {
                var schedule = row.schedules[j];
                schedule.teacher = schedule.yzj_teacher;
                delete schedule.yzj_teacher;
                schedule.venue = schedule.yzj_venue;
                delete schedule.yzj_venue;
                schedule.description = calendar.getDescription(schedule);
            }
            row.classe = row.yzj_classe;
            row.classe_name = row.classe.classe_name;
            row.students = row.classe.yzj_students;
            delete row.yzj_classe;

            rows.push(row);
        }
        res.send(JSON.stringify({total: result.count, rows: rows}));
    });
};

exports.venues = function (req, res) {
    var params = init(req);
    req.db.model("yzj_venue").findAndCount({
        limit: parseInt(params["per-page"]),
        offset: params["per-page"] * (params.page - 1),
        order: params.sort
    }).then(function (result) {
        var rows = [], row;
        for (var i in result.rows) {
            row = result.rows[i].toJSON();
            rows.push(row);
        }
        res.send(JSON.stringify({total: result.count, rows: rows}));
    });
};

exports.calendar = function (req, res) {
    req.db.model("yzj_schedule").findAll({
        where: {
            course_id: req.query.id
        },
        include: [req.db.model("yzj_teacher"), req.db.model("yzj_venue"), req.db.model("yzj_course")]
    }).then(function (result) {
        var out = [];
        for (var i in result) {
            var row = result[i].toJSON();
            var plans = calendar.getPeriodPlans(row, req.query.start, req.query.end);
            for (var j in plans) {
                out.push({
                    title: row.yzj_course.course_name
                    + "-" + row.yzj_teacher.teacher_name
                    + "-" + row.yzj_venue.venue_name,
                    start: plans[j][0].format("YYYY-MM-DD HH:mm:ss"),
                    end: plans[j][1].format("YYYY-MM-DD HH:mm:ss")
                });
            }
        }
        res.send(JSON.stringify(out));
    });
};