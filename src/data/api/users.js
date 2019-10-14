const axios = require('axios').default;
const debug0 = require('debug');
const debug = debug0('slash-command-template:index');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const faker = require('faker');

const userCard = () => {
  let simpleUser = {};
  let card = faker.helpers.contextualCard();
  {
    simpleUser.firstName = card.name;
    simpleUser.userName = card.username;
    simpleUser.street1 = card.address.street;
    simpleUser.city = card.address.city;
    simpleUser.zipCode = card.address.zipcode;
    simpleUser.webPage = card.website;
    simpleUser.email = card.email;
    return simpleUser;
  }
};

const stuEnrollJson = {
  availability: {
    available: 'Yes'
  },
  courseRoleId: 'Student'
};
const insEnrollJson = {
  availability: {
    available: 'Yes'
  },
  courseRoleId: 'Instructor'
};

axiosCookieJarSupport(axios);

let instance = axios.create({
  withCredentials: true
});

const createAndEnrollUsers = (
  cookieJar,
  baseUrl,
  insNum,
  stuNum,
  courseId,
  emailChoice
) => {
  instance.defaults.baseURL = baseUrl;
  let instructors = [];
  let students = [];
  instance.defaults.jar = cookieJar;
  let cards = create_instructor_cards(insNum, emailChoice);
  cards.forEach(card => {
    let readable = JSON.parse(card);
    instructors.push({
      name: readable.givenName + ' ' + readable.familyName,
      userName: readable.userName
    });
    return instance
      .post('/learn/api/v1/users', card)
      .then(result => {
        let user = result.data.id;
        return enroll_instructor(user, courseId);
      })
      .then(() => {
        return instructors;
      })
      .catch(() => console.log('Instructor create/enroll failed.'));
  });

  if (stuNum === '0') {
    debug('These are the instructors: ', instructors);
    sendInsInfo(instructors, courseId);
    throw 'No students to create';
  } else if (stuNum > 0) {
    let cards = create_student_cards(stuNum, courseId, emailChoice);
    cards.forEach(card => {
      let readable = JSON.parse(card);
      students.push({
        name: readable.givenName + ' ' + readable.familyName,
        userName: readable.userName
      });
      return instance
        .post('/learn/api/v1/users', card)
        .then(result => {
          let user = result.data.id;
          return enroll_student(user, courseId);
        })
        .then(() => {
          return students;
        })
        .catch(() => console.log('Student create/enroll failed.'));
    });
    debug('These are the students: ', students);
    sendInsStuInfo(students, instructors, courseId);
  }
};

const user_json = (card, slackUserId, role, emailChoice) => {
  let payloadEmail;

  if (emailChoice === 'yes') {
    let user = getUserInfo(slackUserId).then(user => {
      return user;
    });
    payloadEmail = user.userEmail;
  } else {
    payloadEmail = card.email;
  }
  return (payload = {
    rowStatus: 'Enabled',
    givenName: card.firstName,
    isAvailable: true,
    title: faker.name.title(),
    userName: card.userName,
    password: 'pass',
    familyName: faker.name.lastName(),
    emailAddress: payloadEmail,
    insRoles: [role, 'GUEST'],
    street1: card.street1,
    city: card.city,
    zipCode: card.zipCode,
    webPage: card.webPage
  });
};

const create_student_cards = (stuNum, courseId, slackUserId, emailChoice) => {
  let cards = [];
  let count = 0;
  while (count < stuNum) {
    count++;
    let card = userCard();
    let student_user_json = user_json(
      card,
      slackUserId,
      'STUDENT',
      emailChoice
    );
    let stuUserJson = JSON.stringify(student_user_json);
    cards.push(stuUserJson);
  }
  return cards;
};

const enroll_student = (student, courseId) => {
  let enrollUrl =
    '/learn/api/public/v1/courses/courseId:' + courseId + '/users/' + student;
  return instance.put(enrollUrl, JSON.stringify(stuEnrollJson)).catch(error => {
    console.log(error.config.url);
    console.log(error.response.status);
  });
};

let create_instructor_cards = (insNum, slackUserId, emailChoice) => {
  let cards = [];
  let count = 0;
  while (count < insNum) {
    count++;
    let card = userCard();
    let instructor_user_json = user_json(
      card,
      slackUserId,
      'FACULTY',
      emailChoice
    );
    let insUserJson = JSON.stringify(instructor_user_json);
    cards.push(insUserJson);
  }
  return cards;
};

const enroll_instructor = (instructor, courseId) => {
  let enrollUrl =
    '/learn/api/public/v1/courses/courseId:' +
    courseId +
    '/users/' +
    instructor;
  return instance.put(enrollUrl, JSON.stringify(insEnrollJson)).catch(error => {
    console.log(error.config.url);
    console.log(error.response.status);
  });
};

module.exports = {
  createAndEnrollUsers,
  create_student_cards,
  create_instructor_cards
};

/* sample card
      simpleUser.firstName = card.name;
      simpleUser.userName = card.username;
      simpleUser.street1 = card.address.street;
      simpleUser.city = card.address.city;
      simpleUser.zipCode = card.address.zipcode;
      simpleUser.website = card.website;
 */

/* Sample user JSON from learn api
{
  "rowStatus" : "Enabled",
  "gender" : "MALE",
  "educationLevel" : "FRESHMAN",
  "lastLoginDate" : "2014-09-29T18:57:17.520Z",
  "visibilityScope" : "NOBODY",
  "insRoles" : [ "STUDENT", "GUEST" ],
  "systemRoles" : [ "OBSERVER" ],
  "permissions" : {
    "create" : true,
    "delete" : true,
    "fieldPermissions" : null,
    "editSystemRoles" : true,
    "editAvatar" : true,
    "editInstitutionRoles" : false,
    "editAccountInfo" : true,
    "sendMessage" : true
  },
  "suffix" : "Jr",
  "givenName" : "bart",
  "calendarType" : "GREGORIAN",
  "locale" : "en_US",
  "title" : "Mr",
  "id" : "_1_1",
  "isAvailable" : true,
  "dataSourceId" : "_1_1",
  "portalRoleId" : "_1_1",
  "batchUid" : "123",
  "userName" : "jsimpson",
  "guest" : false,
  "uuid" : "732783bb1b264daa86e0783755442ef5",
  "weekFirstDay" : "0",
  "street2" : "Clark Drive",
  "city" : "Vancouer",
  "state" : "BC",
  "zipCode" : "V582Y6",
  "country" : "Canada",
  "businessPhone1" : "604-299-9001",
  "businessPhone2" : "604-299-9002",
  "homePhone1" : "604-299-9000",
  "homePhone2" : "604-299-9000",
  "mobilePhone" : "604-299-9000",
  "businessFax" : "604-299-9000",
  "homeFax" : "604-299-9000",
  "webPage" : "http://amazon.com",
  "middleName" : "Joe",
  "familyName" : "Simpson",
  "otherName" : "Kyle",
  "emailAddress" : "foo@foo.com",
  "jobTitle" : "Manager",
  "department" : "dept1",
  "company" : "Company1",
  "street1" : "Suite 123",
  "showWorkInfo" : true,
  "showEmailInfo" : true,
  "showAddressInfo" : true,
  "showAddContactInfo" : true,
  "systemRole" : "System Administrator",
  "systemRoleIdentifier" : "Z",
  "birthDate" : "2014-09-16T07:00:00.000Z",
  "studentId" : "113",
  "avatar" : {
    "permanentUrl" : "/images/ci/ng/default_profile_avatar.png"
  },
  "cloudId" : "1111111"
}
 */
