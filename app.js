//express_demo.js 文件
const express = require('express');
const session = require('express-session');
const fs = require("fs");
const db = require("./db");

const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(db);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 900000
    }
}));

//auth.use();

app.use(routes);

app.use(function (err, req, res, next) {
    if (err.statusCode == 401) {
        res.redirect("/login");
    }else{
        throw Error(err);
    }
});

var server = app.listen(8181, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});


// var http = require('http');
// var url = require("url");
//
// http.createServer(function (request, response) {
//     request.on('data', function (chunk) {
//         console.log(chunk);
//     });
//     console.log(url.parse(request.url));
//     response.writeHead(200, {'Content-Type': 'text-plain'});
//     response.write("Hello World");
//     response.end();
// }).listen(8124);

//var fs = require("fs");


//
// s.query("SELECT * FROM yzj_user WHERE id=28", {
//     model: s.model('user')
// }).then(function (result) {
//     console.log(result);
// });

//
// User.findAll().then(function (result) {
//     console.log(result);
// });
