const axios = require('axios');
const cheerio = require('cheerio');
const axiosCookieJarSupport = require('axios-cookiejar-support');
const tough = require('tough-cookie');
const debug0 = require('debug');

const debug = debug0('slash-command-template:index');

let bbnonce;
let loginUrl;

axiosCookieJarSupport.default(axios);
const cookieJar = new tough.CookieJar();

let instance = axios.create({
  jar: cookieJar,
  withCredentials: true
});

const clearUrl = '/webapps/login/?action=logout';
const nonceUrl = '/webapps/login/?action=login';
const tokenUrl = '/learn/api/v1/utilities/xsrfToken';

function authenticate(adminPassword, baseUrl) {
  //console.log('you are in the authenticate function');
  instance.defaults.baseURL = baseUrl;
  return instance
    .post(clearUrl)
    .then(() => {
      //console.log('Nonce is cleared');
      return instance.post(nonceUrl);
    })
    .then(response => {
      //console.log('Login page loaded');
      try {
        let html = response.data;
        let $ = cheerio.load(html);
        bbnonce = $(
          'input[name="blackboard.platform.security.NonceUtil.nonce"]'
        ).attr('value');
        loginUrl =
          '/webapps/login/?user_id=administrator&action=login&password=' +
          adminPassword +
          '&blackboard.platform.security.NonceUtil.nonce=' +
          bbnonce;
      } catch (e) {
        console.log('login failed');
      }
      return instance.post(loginUrl);
    })
    .then(() => {
      //console.log('Admin is logged in');
      return instance.get(tokenUrl);
    })
    .then(response => {
      return {
        token: response.data.xsrfToken,
        cookieJar: instance.defaults.jar
      };
    })
    .catch(e => {
      console.log(e);
    });
}

module.exports = { authenticate };
