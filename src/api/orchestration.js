import { authenticate } from '../api/authentication';
import getLearnConfig from '../api/getLearnEnvironments';
//import baseCourse from '../api/courses';

/*const coursePayload = statePayload => {
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
};*/

let baseUrl = '';
let adminPassword = '';

export const createCourse = statePayload => {
  //let learnToken = '';
  console.log('statePayload: ' + statePayload.learnUrl);
  if (statePayload.hideCustom === true) {
    let config = getLearnConfig(statePayload.learnUrl);
    baseUrl = config.baseUrl;
    adminPassword = config.password;
    console.log('adminPassword: ' + adminPassword);
  } else {
    baseUrl = statePayload.learnUrl;
    adminPassword = statePayload.adminPassword;
  }
  //const courseJson = coursePayload(statePayload);
  authenticate(adminPassword, baseUrl).then(response =>
    console.log('turd ' + response)
  );
};

//const createInstructor = () => {};
