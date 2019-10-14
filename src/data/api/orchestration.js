const { authenticate } = require('./authentication');
const { getLearnConfig } = require('./getLearnEnvironments');
const { createCourse } = require('../api/courses');
const debug0 = require('debug');

const debug = debug0('slash-command-template:index');

const coursePayload = statePayload => {
  return {
    isAvailable: true,
    durationType: 'CONTINUOUS',
    courseId: statePayload.courseId,
    ultraStatus: statePayload.type,
    isClosed: false,
    rowStatus: statePayload.available,
    name: statePayload.courseName,
    description: statePayload.courseDesc
  };
};

let baseUrl = '';
let adminPassword = '';
let learnToken = '';
let cookieJar;
let courseUrl;

const createData = async statePayload => {
  if (statePayload.hideCustom === true) {
    let config = getLearnConfig(statePayload.learnUrl);
    baseUrl = config.baseUrl;
    adminPassword = config.password;
    debug('adminPassword: ' + adminPassword);
    debug('url: ' + baseUrl);
  } else {
    baseUrl = statePayload.learnUrl;
    adminPassword = statePayload.adminPassword;
  }
  const courseJson = coursePayload(statePayload);
  await authenticate(adminPassword, baseUrl)
    .then(response => {
      learnToken = response.token;
      cookieJar = response.cookieJar;
    })
    .catch(e => console.log(e));

  createCourse(adminPassword, baseUrl, learnToken, courseJson, cookieJar)
    .then(response => (response.data.externalAccessUrl = courseUrl))
    .catch(e => console.log(e));

  //createUser();
};

//const createInstructor = () => {};

module.exports = { createData };
