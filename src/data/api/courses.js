const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support');
const debug0 = require('debug');

const debug = debug0('slash-command-template:index');

axiosCookieJarSupport.default(axios);

let instance = axios.create({
  withCredentials: true
});

const createCourse = (
  adminPassword,
  baseUrl,
  xsrfToken,
  coursePayload,
  cookieJar
) => {
  instance.defaults.jar = cookieJar;
  instance.defaults.baseURL = baseUrl;
  instance.defaults.headers = {
    'X-Blackboard-XSRF': xsrfToken,
    'Content-Type': 'application/json'
  };
  //console.log(instance.defaults);
  let courseJson = JSON.stringify(coursePayload);
  //console.log('Here is the course JSON we are sending: ' + courseJson);
  return instance
    .post(
      '/learn/api/v1/courses?fields=courseId,name,ultraStatus,description,externalAccessUrl',
      courseJson
    )
    .then(createdCourse => {
      if (createdCourse.status === 201) {
        console.log(createdCourse.data);
        return createdCourse;
      }
    })
    .catch(error => console.log('Course create failed somewhere :( ' + error));
};

module.exports = { createCourse };
