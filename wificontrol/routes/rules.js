var express = require("express");
var router = express.Router();
var config = require("config");

// stringify then parse to force deep copy of config so we can modify it
var users = JSON.parse(JSON.stringify(config.get("users")));

router.get("/", function(req, res, next) {
  console.log(users);
  res.json(users);
});

router.post("/", function(req, res, next) {
  rule = req.param("rule");
  enabled = req.param("enabled") == "true";
  users.find(row => row.rule == rule).enabled = enabled;
  res.send("ok");
});

module.exports = router;
