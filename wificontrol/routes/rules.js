var express = require("express");
var router = express.Router();
var config = require("config");
var luci = require("../luci");

// stringify then parse to force deep copy of config so we can modify it
var users = JSON.parse(JSON.stringify(config.get("users")));

router.get("/", function(req, res, next) {
  for (const item of users) {
    // inverse logic, internet enabled means the rule is disabled.
    luci.get(item.rule, function(value) {
      item.enabled = value == 0;
    });
  }
  res.json(users);
});

router.post("/", function(req, res, next) {
  rule = req.param("rule");
  enabled = req.param("enabled") == "true";
  when = req.param("time");
  setTimeout(function() {
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
  }, when * 60 * 1000);
  res.send("ok");
});

module.exports = router;
