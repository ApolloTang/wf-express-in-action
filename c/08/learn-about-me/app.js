var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");

var setUpPassport = require("./setuppassport");
var routes = require("./routes");

var app = express();
mongoose.connect("mongodb://localhost:27017/test", {
  // (node:15637)
  // DeprecationWarning: current URL string parser is deprecated, and
  // will be removed in a future version. To use the new parser, pass
  //  option { useNewUrlParser: true } to MongoClient.connect.
  useNewUrlParser: true,

  // (node:15637)
  // DeprecationWarning: current Server Discovery and Monitoring engine
  //  is deprecated, and will be removed in a future version. To use
  //  the new Server Discover and Monitoring engine, pass option {
  //  useUnifiedTopology: true } to the MongoClient constructor.
  useUnifiedTopology: true,

  // (node:15637)
  // DeprecationWarning: collection.ensureIndex is deprecated. Use
  // createIndexes instead.
  useCreateIndex: true

  // SEE: https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
});

setUpPassport();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false })); // extended=false so parsing is simpler n secure
app.use(cookieParser());

app.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
