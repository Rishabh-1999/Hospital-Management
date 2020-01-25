const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var morgan = require("morgan");

var app = express();

var http = require("http");
var server = http.Server(app);
var PORT = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.static(__dirname + "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "layout"
    })
);
app.set("view engine", "handlebars");

/* DB */
require("./static/db");

app.use(morgan("dev"));

var db = mongoose.connection;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cookieParser());

/* Session */
app.use(
    session({
        secret: "secret",
        saveUninitialized: true,
        resave: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

/* Express Validator */
app.use(
    expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split("."),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += "[" + namespace.shift() + "]";
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    })
);

app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

app.use("/app", (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/");
    }
});

/* Routes */
app.use("/", require("./routes/login"));
app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/rooms"));
app.use("/", require("./routes/settings"));
app.use("/", require("./routes/users"));
app.use("/", require("./routes/diseases"));
app.use("/", require("./routes/patients"));

server.listen(PORT, () => {
    console.log("Sever on port: " + PORT);
});