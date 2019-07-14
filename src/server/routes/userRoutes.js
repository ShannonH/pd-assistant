const User = require('../../data/models/Users');
const express = require('express');
const router = express.Router();

router.post('/users/create', function(req, res) {
  User.findOrCreate({
    where: { email: req.body.email },
    defaults: { username: req.body.username }
  }).then((user, created) => {
    if (created) {
      res.status = '201';
    } else res.status = '200';
  });
  res.send(res.status);
});

module.exports = router;
