const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();
var app = express();
var http = require("http");
var server = http.Server(app);
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

var timestamp = new Date().getTime();

server.listen(PORT, () => {
  console.log("Sever on port: " + PORT);
});
