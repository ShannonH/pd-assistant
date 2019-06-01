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
  if (statePayload.hideCustom === true) {
    let config = getLearnConfig(statePayload.baseUrl);
    baseUrl = config.baseUrl;
    adminPassword = config.password;
  } else {
    baseUrl = statePayload.baseUrl;
    adminPassword = statePayload.adminPassword;
  }
  //const courseJson = coursePayload(statePayload);
  let tip = authenticate(adminPassword, baseUrl);
  console.log(tip + ' whatever');
};

//const createInstructor = () => {};
