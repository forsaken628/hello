/**
 * Created by forsa on 2016-10-27.
 */
const Sequelize = require('sequelize');
const fs = require("fs");

var seq = new Sequelize('mysql://root:c93430fc@localhost/yzj');

var files = fs.readdirSync("./db");

for (var i in files) {
    seq.import("./db/" + files[i]);
}

const User = seq.model("yzj_user");
const Admin = seq.model("yzj_admin");
const Student = seq.model("yzj_student");
const Teacher = seq.model("yzj_teacher");
const Classe = seq.model("yzj_classe");
const StudentClasse = seq.model("yzj_student_classe");
const Course = seq.model("yzj_course");
const Schedule = seq.model("yzj_schedule");
const Venue = seq.model("yzj_venue");

User.hasOne(Admin, {foreignKey: "id"});
User.hasOne(Teacher, {foreignKey: "id"});
User.hasOne(Student, {foreignKey: "id"});

Classe.belongsToMany(Student, {through: StudentClasse, foreignKey: "classe_id"});
Student.belongsToMany(Classe, {through: StudentClasse, foreignKey: "student_id"});

Classe.hasMany(Course, {foreignKey: "id"});

Course.hasMany(Schedule, {foreignKey: "course_id"});
Course.belongsTo(Classe, {foreignKey: "classe_id"});

Schedule.belongsTo(Teacher, {foreignKey: "teacher_id"});
Schedule.belongsTo(Venue, {foreignKey: "venue_id"});
Schedule.belongsTo(Course, {foreignKey: "course_id"});

module.exports = function (req, res, next) {
    req.db = seq;
    next();
};