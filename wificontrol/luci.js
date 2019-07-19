//
// API helpers to talk with OpenWRT JSON-RPC
//

var Luci = function() {};

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
      console.log("Token: " + token);
      callback();
    }
  });
};

Luci.prototype.set = function(rule, value, callback) {
  if (token == null) {
    Luci.prototype.login(function() {
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
    request(options, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      console.log("LUCI rule: " + rule + " set: " + value + " result: " + body);
      if (!error && response.statusCode == 200) {
        options.body =
          ' {"id": "1", "method": "commit", "params": ["firewall"] }';
        request(options, function(error, response, body) {
          if (error) {
            console.log(error);
          }
          console.log("LUCI commit result: " + body);
          if (!error && response.statusCode == 200) {
            //
            // Now force a firewall restart to pick up the config changes
            options.url =
              "http://" + host + "/cgi-bin/luci/rpc/sys?auth=" + token;
            options.body = ' { "method": "exec", "params": ["fw3 restart"] }';
            request(options, function(error, response, body) {
              console.log("LUCI exec result: " + body);
              callback();
            });
          }
        });
      }
    });
  }
};

Luci.prototype.get = function(rule, callback) {
  if (token == null) {
    Luci.prototype.login(function() {
      Luci.prototype.get(rule, callback);
    });
  } else {
    var dataString =
      '{ "id": "1", "method": "get", "params": ["firewall", "@rule[' +
      rule +
      ']", "enabled"]}';

    var options = {
      url: "http://" + host + "/cgi-bin/luci/rpc/uci?auth=" + token,
      method: "POST",
      body: dataString
    };
    request(options, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      var enabled = JSON.parse(body).result;
      console.log("LUCI rule: " + rule + " enabled: " + enabled);
      callback(enabled);
    });
  }
};

// test
//Luci.prototype.set(13, 1, function(){});
//Luci.prototype.get(13, function(value) { console.log(value); });

module.exports = new Luci();
