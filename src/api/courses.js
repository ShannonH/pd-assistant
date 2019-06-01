import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import * as tough from 'tough-cookie';
import debug0 from 'debug';

const debug = debug0('slash-command-template:index');

axiosCookieJarSupport(axios);
const cookieJar = new tough.CookieJar();

let instance = axios.create({
  jar: cookieJar,
  withCredentials: true
});

const baseCourse = (adminPassword, baseUrl, xsrfToken, coursePayload) => {
  instance.defaults.baseURL = baseUrl;
  instance.defaults.headers = {
    'X-Blackboard-XSRF': xsrfToken,
    'Content-Type': 'application/json'
  };
  let courseJson = JSON.stringify(coursePayload);
  debug('Here is the course JSON we are sending: ' + courseJson);
  return instance
    .post(
      '/learn/api/v1/courses?fields=courseId,name,ultraStatus,description,externalAccessUrl',
      courseJson
    )
    .then(createdCourse => {
      if (createdCourse.status === 201) {
        debug(createdCourse.data.courseId);
        return createdCourse;
      }
    })
    .catch(error => console.log('Course create failed somewhere :( ' + error));
};

export default baseCourse;
