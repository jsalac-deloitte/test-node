var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins! " + new Date() });
});

app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port 80");
});
