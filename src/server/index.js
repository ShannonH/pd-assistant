require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const epilogue = require('epilogue');
const Sequelize = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './src/data/ep-assistant.sqlite',
  define: {
    timestamps: false
  }
});

const Project = database.import('../data/models/Projects');
const User = database.import('../data/models/Users');
const Team = database.import('../data/models/Teams');
const Analysis = database.import('../data/models/Analysis');
const Requirement = database.import('../data/models/Requirements');
const Preference = database.import('../data/models/Preferences');

epilogue.initialize({ app, sequelize: database });

epilogue.resource({
  model: User,
  endpoints: ['/users', '/users/:id']
});

epilogue.resource({
  model: Project,
  endpoints: ['/projects', '/projects/:id'],
  search: {
    param: 'searchByTeam',
    attributes: ['team']
  }
});

epilogue.resource({
  model: Analysis,
  endpoints: ['/analysis', '/analysis/:id']
});

epilogue.resource({
  model: Team,
  endpoints: ['/teams', '/teams/:userId/team/:name', '/teams/:id']
});

epilogue.resource({
  model: Preference,
  endpoints: ['/preferences', '/preferences/:userId']
});

epilogue.resource({
  model: Requirement,
  endpoints: ['/requirements', '/requirements/:id'],
  search: {
    param: 'searchByProject',
    attributes: ['projectId']
  }
});

User.hasMany(Team);
User.hasMany(Analysis);
User.hasMany(Project);
User.hasMany(Preference);
Team.hasMany(Project);
Project.hasMany(Analysis);
Project.hasMany(Requirement);

const port = process.env.SERVER_PORT || 3001;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
