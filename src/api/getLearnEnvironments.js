let learnEnv;
let { getCreds } = require('../src/messages/get_admin_credentials');

const getLearnConfig = (
  hostname,
  courseType,
  courseName,
  courseId,
  courseDesc,
  slackUserId
) => {
  if (hostname === 'ultra-integ') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://ultra-integ.int.bbpd.io',
      password: 'ZwFPGT6lgSIapw'
    });
  } else if (hostname === 'ultra-dev') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://ultra-dev.int.bbpd.io',
      password: 'hAllow33n!%'
    });
  } else if (hostname === 'qa-ultra-adv-dev') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-ultra-adv-dev.int.bbpd.io',
      password: 'db2a8ae55c9a'
    });
  } else if (hostname === 'qa-original-std-dev') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-std-dev.int.bbpd.io',
      password: 'hAllow33n!%'
    });
  } else if (hostname === 'qa-original-adv-dev') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-adv-dev.int.bbpd.io',
      password: '45584d8f0676'
    });
  } else if (hostname === 'qa-original-std-ivp') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-std-ivp.int.bbpd.io',
      password: 'hAllow33n!%'
    });
  } else if (hostname === 'qa-ultra-adv-rc') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-ultra-adv-rc.int.bbpd.io',
      password: 'c6f1515a734a'
    });
  } else if (hostname === 'qa-trylearn-std-rc') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-trylearn-std-rc.int.bbpd.io',
      password: '557b6b76ede3'
    });
  } else if (hostname === 'qa-original-std-rc') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-std-rc.int.bbpd.io',
      password: '46f665d874dd'
    });
  } else if (hostname === 'qa-original-adv-rc') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-adv-rc.int.bbpd.io',
      password: '1d4e115470cf'
    });
  } else if (hostname === 'qa-mooc-std-rc') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-mooc-std-rc.int.bbpd.io',
      password: '5f66def79d6a'
    });
  } else if (hostname === 'qa-ultra-adv-clienttest-latest') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-ultra-adv-clienttest-latest.bbpd.io',
      password: '7b44e1fae834'
    });
  } else if (hostname === 'qa-original-adv-clienttest-latest') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-adv-clienttest-latest.bbpd.io',
      password: 'f5af7abc2fb4'
    });
  } else if (hostname === 'qa-ultra-adv-clienttest') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-ultra-adv-clienttest.int.bbpd.io',
      password: 'hAllow33n!%'
    });
  } else if (hostname === 'qa-original-adv-clienttest') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-adv-clienttest.int.bbpd.io',
      password: 'hAllow33n!%'
    });
  } else if (hostname === 'qa-ultra-adv-ga') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-ultra-adv-ga.int.bbpd.io',
      password: 'hAllow33n!%'
    });
  } else if (hostname === 'qa-original-adv-ga') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-adv-ga.int.bbpd.io',
      password: '75c189a9e5dd'
    });
  } else if (hostname === 'qa-original-std-ga') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-std-ga.int.bbpd.io',
      password: 'hAllow33n!%'
    });
  } else if (hostname === 'qa-original-std-ivp2') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-std-ivp2.int.bbpd.io',
      password: '9de5b18d477c'
    });
  } else if (hostname === 'qa-original-std-ivp3400x.bbpd.io') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-std-ivp3400x.bbpd.io',
      password: '97bd40d260a4'
    });
  } else if (hostname === 'qa-original-adv-ivp3500x.bbpd.io') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://qa-original-adv-ivp3500x.bbpd.io',
      password: '4e6f875cdd9d'
    });
  } else if (hostname === 'coreservices') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://coreservices.int.bbpd.io',
      password: 'hAllow33n!%'
    });
  } else if (hostname === 'contentpartnershipssaasqa-dev') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://contentpartnershipssaasqa-dev.blackboard.com',
      password: 'dde09868f55f'
    });
  } else if (hostname === 'ultra-sec1') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://ultra-sec1.int.bbpd.io',
      password: '651e27947179'
    });
  } else if (hostname === 'localization-dev') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://localization-dev.int.bbpd.io',
      password: 'b862b10d2ae1'
    });
  } else if (hostname === 'contentpartnershipssaasqa-client') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://contentpartnershipssaasqa-client.blackboard.com',
      password: '0f8721371c3d'
    });
  } else if (hostname === 'bb-icm-internal') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://bb-icm-internal.bbpd.io',
      password: 'a7dab6105718'
    });
  } else if (hostname === 'bb-consulting-stage') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://bb-consulting-stage.bbpd.io',
      password: 'bf058f20265f'
    });
  } else if (hostname === 'bb-consulting-bd-stage') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://bb-consulting-bd-stage.bbpd.io',
      password: '1ab0ceb52335'
    });
  } else if (hostname === 'b2dev-k12-new') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://b2dev-k12-new.int.bbpd.io',
      password: '02815466f3f2'
    });
  } else if (hostname === 'internal-ultrareadiness') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://internal-ultrareadiness.blackboard.com',
      password: '1a13fbfec120'
    });
  } else if (hostname === 'mobile-pf-test') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://mobile-pf-test.blackboard.com',
      password: '91528eace2b2'
    });
  } else if (hostname === 'partner-smoke-test-a') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://partner-smoke-test-a.blackboard.com',
      password: '561d4e6d4fcc'
    });
  } else if (hostname === 'partner-smoke-test-b') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://partner-smoke-test-b.blackboard.com',
      password: 'd7c43f061549'
    });
  } else if (hostname === 'contentpartnershipssaasqa-stage') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://contentpartnershipssaasqa-stage.blackboard.com',
      password: 'dfe2648cd901'
    });
  } else if (hostname === 'bb-icm-test') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://bb-icm-test.bbpd.io',
      password: '0aa9e286ee8e'
    });
  } else if (hostname === 'bb-icm-prod') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://bb-icm-prod.bbpd.io',
      password: '6763ecda2536'
    });
  } else if (hostname === 'bb-consulting-bd-prod') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://bb-consulting-bd-prod.bbpd.io',
      password: '397cc1759715'
    });
  } else if (hostname === 'bb-consulting-prod') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://bb-consulting-prod.bbpd.io',
      password: '96bef99e0b8e'
    });
  } else if (hostname === 'sisaas-learn-qa') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://sisaas-learn-qa.int.bbpd.io',
      password: '9b3793c15c64'
    });
  } else if (hostname === 'ultra-predict') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://ultra-predict.int.bbpd.io',
      password: '1389d1ee00ab'
    });
  } else if (hostname === 'b2dev-nahe-new') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://b2dev-nahe-new.int.bbpd.io',
      password: '10887151a7a4'
    });
  } else if (hostname === 'dev-lgw1-plus') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://dev-lgw1-plus.int.bbpd.io',
      password: '5935cebd7fdd'
    });
  } else if (hostname === 'dev-lgw2-plus') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://dev-lgw2-plus.int.bbpd.io',
      password: '471ac3d022e1'
    });
  } else if (hostname === 'allyinteg') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://allyinteg.int.bbpd.io',
      password: 'a18e36eed13d'
    });
  } else if (hostname === 'getwelltemp') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://getwelltemp.int.bbpd.io',
      password: 'f21a209e0dd2'
    });
  } else if (hostname === 'getwelltempno2') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://getwelltempno2.int.bbpd.io',
      password: 'e2dd5e8dce71'
    });
  } else if (hostname === 'vhs') {
    return (learnEnv = {
      courseId: courseId,
      courseName: courseName,
      courseDesc: courseDesc,
      courseType: courseType,
      slackUserId: slackUserId,
      baseUrl: 'https://vhs.int.bbpd.io',
      password: 'e3e1a0655f62'
    });
  } else {
    return 'nope';
  }
};

const setConfig = (
  hostname,
  courseType,
  courseName,
  courseId,
  courseDesc,
  slackUserId
) => {
  let learnEnv = getLearnConfig(
    hostname,
    courseType,
    courseName,
    courseId,
    courseDesc,
    slackUserId
  );
  if (learnEnv === 'nope') {
    getCreds(
      hostname,
      courseType,
      courseName,
      courseId,
      courseDesc,
      slackUserId
    );
  } else {
    return learnEnv;
  }
};

const getCurrentConfig = () => {
  return learnEnv;
};

module.exports = { getCurrentConfig, setConfig };
