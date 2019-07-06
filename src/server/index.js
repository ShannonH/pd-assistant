require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const epilogue = require('epilogue');
const Sequelize = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './src/data/ep-assistant.sqlite'
});

const User = database.define('user', {
  username: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: { isEmail: true }
  }
});

const Preference = database.define('preference', {
  useCalendar: Sequelize.BOOLEAN,
  darkMode: { type: Sequelize.BOOLEAN, defaultValue: false },
  theme: { type: Sequelize.STRING, defaultValue: 'light' }
});

const Analysis = database.define('analysis', {
  title: Sequelize.STRING,
  type: Sequelize.STRING
});

const Team = database.define('team', {
  name: Sequelize.STRING
});

const Project = database.define('project', {
  dpNumber: Sequelize.STRING
});

const Requirement = database.define('requirement', {
  name: Sequelize.STRING,
  description: Sequelize.STRING
});

User.hasMany(Team);
User.hasMany(Analysis);
User.hasMany(Project);
User.hasMany(Preference);
Project.hasMany(Analysis);
Project.hasMany(Requirement);
Team.hasMany(Project);

epilogue.initialize({ app, sequelize: database });

epilogue.resource({
  model: User,
  endpoints: ['/users', '/users/:username']
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
  endpoints: ['/teams', '/teams/:id'],
  search: {
    param: 'searchByUser',
    attributes: ['username']
  }
});

epilogue.resource({
  model: Preference,
  endpoints: ['/preferences'],
  search: {
    param: 'searchByUser',
    attributes: ['username']
  }
});

epilogue.resource({
  model: Requirement,
  endpoints: ['/requirements', '/requirements/:id'],
  search: {
    param: 'searchByProject',
    attributes: ['projectId']
  }
});

const port = process.env.SERVER_PORT || 3001;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
