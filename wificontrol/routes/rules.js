var express = require("express");
var router = express.Router();
var config = require("config");
var luci = require("../luci");

// stringify then parse to force deep copy of config so we can modify it
var users = JSON.parse(JSON.stringify(config.get("users")));

router.get("/", function(req, res, next) {
  res.json(users);
});

router.post("/", function(req, res, next) {
  rule = req.param("rule");
  enabled = req.param("enabled") == "true";
  users.find(row => row.rule == rule).enabled = enabled;
  // inverse logic, internet enabled means the rule is disabled.
  if (enabled) {
    luci.set(rule, 0, function() {
      console.log("ON");
    });
  } else {
    luci.set(rule, 1, function() {
      console.log("OFF");
    });
  }
  res.send("ok");
});

module.exports = router;
