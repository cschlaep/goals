var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'LeapChart' });
});

// router.get('/gauge', function(req, res) {
//   res.render('gauge', { title: 'LeapChart' });
// });

// router.get('/bar', function(req, res) {
//   res.render('bar', { title: 'LeapChart - Bar' });
// });

// router.get('/pie', function(req, res) {
//   res.render('pie', { title: 'LeapChart - Pie' });
// });

// router.get('/line', function(req, res) {
//   res.render('line', { title: 'LeapChart - Line' });
// });

module.exports = router;
