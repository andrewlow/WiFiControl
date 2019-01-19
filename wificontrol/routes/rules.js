var express = require('express');
var router = express.Router();
var users = [
 { "name": "Alison",
   "rule": 8,
   "enabled": true},
 { "name": "Mark",
   "rule": 9,
   "enabled": true},
]
/* GET users listing. */
router.get('/', function(req, res, next) {

  // sample json payload
res.json(users)
});

router.post('/', function(req, res, next) {
rule = req.param('rule')
enabled = (req.param('enabled') == 'true')
users.find(row => row.rule == rule).enabled = enabled

res.send('ok')
});

module.exports = router;

