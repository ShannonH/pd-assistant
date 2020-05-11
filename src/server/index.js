require('dotenv').config({ path: '.env.local' });
const routes = require('./routes/routes');
const cors = require('cors');
const express = require('express');
const finale = require('finale-rest');
const Sequelize = require('sequelize');
const path = require('path');

// start express server
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.enable('trust proxy');
routes(app);

// database configuration - sqlite to keep it small
const database = new Sequelize({
  dialect: 'sqlite',
  storage: './src/data/pd-assistant.sqlite',
  define: {
    timestamps: false
  }
});

// Models
const Project = database.import('../data/models/Projects');
const User = database.import('../data/models/Users');
const Team = database.import('../data/models/Teams');
const Analysis = database.import('../data/models/Analysis');
const Requirement = database.import('../data/models/Requirements');
const Preference = database.import('../data/models/Preferences');
const Integration = database.import('../data/models/Integrations');

// Initialize database
finale.initialize({ app, sequelize: database });

// Resources
finale.resource({
  model: User,
  endpoints: ['/users', '/users/:id']
});

finale.resource({
  model: Project,
  endpoints: ['/projects', '/projects/:id'],
  search: {
    param: 'searchByTeam',
    attributes: ['teamName']
  }
});

finale.resource({
  model: Analysis,
  endpoints: ['/analysis', '/analysis/:id']
});

finale.resource({
  model: Team,
  endpoints: ['/teams', '/teams/:userId/team/:name', '/teams/:userId']
});

finale.resource({
  model: Preference,
  endpoints: ['/preferences', '/preferences/:userId']
});

finale.resource({
  model: Requirement,
  endpoints: ['/requirements', '/requirements/:id'],
  search: {
    param: 'searchByProject',
    attributes: ['projectId']
  }
});

finale.resource({
  model: Integration,
  endpoints: ['/integrations']
});

// Associations
User.hasMany(Team);
User.hasMany(Analysis);
User.hasMany(Project);
User.hasMany(Preference);
Team.hasMany(Project);
Project.hasMany(Analysis);
Project.hasMany(Requirement);
Project.hasMany(Integration);

// start app
const port = process.env.SERVER_PORT || 3001;
database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

module.exports = { app };
