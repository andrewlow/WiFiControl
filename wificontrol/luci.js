//
// API helpers to talk with OpenWRT JSON-RPC
//

var Luci = function () {};

var config = require("config");
var request = require("request");
var token = null;

var user = config.get("router_user");
var pass = config.get("router_pass");
var host = config.get("router_host");

Luci.prototype.login = function(callback) {
  // Log in and get token
  var dataString =
    '{ "id": 1, "method": "login", "params": ["' + user + '", "' + pass + '"]}';
  var options = {
    url: "http://" + host + "/cgi-bin/luci/rpc/auth",
    method: "POST",
    body: dataString
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      token = JSON.parse(body).result;
console.log(token);
      callback();
    }
  });
}

Luci.prototype.set = function(rule, value, callback) {
  if (token == null) {
    Luci.prototype.login(function() {
console.log('logged in');
      Luci.prototype.set(rule, value, callback);
    });
  } else {
    var dataString =
      '{ "id": "1", "method": "set", "params": ["firewall", "@rule[' +
      rule +
      ']", "enabled", "' +
      value +
      '"]}';

    var options = {
      url: "http://" + host + "/cgi-bin/luci/rpc/uci?auth=" + token,
      method: "POST",
      body: dataString
    };
console.log(options);
    request(options, function(error, response, body) {
console.log(body);
      if (!error && response.statusCode == 200) {
        options.body =
          ' {"id": "1", "method": "apply", "params": ["firewall"] }';
        request(options, function(error, response, body) {
console.log(body);
          callback();
        });
      }
    });
  }
}

// test
//Luci.prototype.set(13, 1, function(){});

module.exports = new Luci();
