import axios from 'axios';
import cheerio from 'cheerio';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import * as tough from 'tough-cookie';
import debug0 from 'debug';

const debug = debug0('slash-command-template:index');

let bbnonce;
let loginUrl;

axiosCookieJarSupport(axios);
const cookieJar = new tough.CookieJar();

let instance = axios.create({
  jar: cookieJar,
  withCredentials: true
});

const clearUrl = '/webapps/login/?action=logout';
const nonceUrl = '/webapps/login/?action=login';
const tokenUrl = '/learn/api/v1/utilities/xsrfToken';

export function authenticate(adminPassword, baseUrl) {
  debug('you are in the authenticate function');
  instance.defaults.baseURL = baseUrl;

  return instance
    .post(clearUrl)
    .then(response => {
      debug('Nonce is cleared');
      debug(response.status);
      return instance.post(nonceUrl);
    })
    .then(response => {
      debug('Login page loaded');
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
    .then(response => {
      debug('Admin is logged in');
      debug(response.status);
      return instance.get(tokenUrl);
    })
    .catch(e => {
      console.log(e);
    });
}
