const dataApi = require('../data/api/orchestration');

module.exports = function(app) {
  app.put('/createData', (req, res) => {
    let course = dataApi.createData(req.body);
    console.log(course);
    res.send(course);
  });

  app.put('/users/create', function(req, res) {
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
};
