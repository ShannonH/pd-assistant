const getLearnConfig = hostname => {
  if (hostname === 'ultra-canary') {
    return {
      baseUrl: 'https://ultra-canary.bbpd.io',
      password: 'ZwFPGT6lgSIapw'
    };
  } else if (hostname === 'ultra-next') {
    return {
      baseUrl: 'https://ultra-next.bbpd.io',
      password: 'hAllow33n!%'
    };
  } else if (hostname === 'qa-ultra-adv-dev') {
    return {
      baseUrl: 'https://qa-ultra-adv-dev.int.bbpd.io',
      password: 'db2a8ae55c9a'
    };
  } else if (hostname === 'qa-original-std-dev') {
    return {
      baseUrl: 'https://qa-original-std-dev.int.bbpd.io',
      password: 'hAllow33n!%'
    };
  } else if (hostname === 'qa-original-adv-dev') {
    return {
      baseUrl: 'https://qa-original-adv-dev.int.bbpd.io',
      password: '45584d8f0676'
    };
  } else if (hostname === 'qa-ultra-adv-rc') {
    return {
      baseUrl: 'https://qa-ultra-adv-rc.int.bbpd.io',
      password: 'c6f1515a734a'
    };
  } else if (hostname === 'qa-trylearn-std-rc') {
    return {
      baseUrl: 'https://qa-trylearn-std-rc.int.bbpd.io',
      password: '557b6b76ede3'
    };
  } else if (hostname === 'qa-original-adv-rc') {
    return {
      baseUrl: 'https://qa-original-adv-rc.int.bbpd.io',
      password: '1d4e115470cf'
    };
  } else if (hostname === 'qa-mooc-std-rc') {
    return {
      baseUrl: 'https://qa-mooc-std-rc.int.bbpd.io',
      password: '5f66def79d6a'
    };
  } else if (hostname === 'qa-ultra-adv-clienttest-latest') {
    return {
      baseUrl: 'https://qa-ultra-adv-clienttest-latest.bbpd.io',
      password: '7b44e1fae834'
    };
  } else if (hostname === 'qa-original-adv-clienttest-latest') {
    return {
      baseUrl: 'https://qa-original-adv-clienttest-latest.bbpd.io',
      password: 'f5af7abc2fb4'
    };
  } else if (hostname === 'qa-ultra-adv-clienttest') {
    return {
      baseUrl: 'https://qa-ultra-adv-clienttest.int.bbpd.io',
      password: 'hAllow33n!%'
    };
  } else if (hostname === 'qa-original-adv-clienttest') {
    return {
      baseUrl: 'https://qa-original-adv-clienttest.int.bbpd.io',
      password: 'hAllow33n!%'
    };
  } else if (hostname === 'qa-ultra-adv-ga') {
    return {
      baseUrl: 'https://qa-ultra-adv-ga.int.bbpd.io',
      password: 'hAllow33n!%'
    };
  } else if (hostname === 'qa-original-adv-ga') {
    return {
      baseUrl: 'https://qa-original-adv-ga.int.bbpd.io',
      password: '75c189a9e5dd'
    };
  } else if (hostname === 'qa-original-std-ga') {
    return {
      baseUrl: 'https://qa-original-std-ga.int.bbpd.io',
      password: 'hAllow33n!%'
    };
  } else if (hostname === 'qa-original-std-ivp2') {
    return {
      baseUrl: 'https://qa-original-std-ivp2.int.bbpd.io',
      password: '9de5b18d477c'
    };
  } else if (hostname === 'qa-original-std-ivp3400x.bbpd.io') {
    return {
      baseUrl: 'https://qa-original-std-ivp3400x.bbpd.io',
      password: '97bd40d260a4'
    };
  } else if (hostname === 'qa-original-adv-ivp3500x.bbpd.io') {
    return {
      baseUrl: 'https://qa-original-adv-ivp3500x.bbpd.io',
      password: '4e6f875cdd9d'
    };
  } else if (hostname === 'coreservices') {
    return {
      baseUrl: 'https://coreservices.int.bbpd.io',
      password: 'hAllow33n!%'
    };
  } else if (hostname === 'contentpartnershipssaasqa-dev') {
    return {
      baseUrl: 'https://contentpartnershipssaasqa-dev.blackboard.com',
      password: 'dde09868f55f'
    };
  } else if (hostname === 'ultra-sec1') {
    return {
      baseUrl: 'https://ultra-sec1.int.bbpd.io',
      password: '651e27947179'
    };
  } else if (hostname === 'localization-dev') {
    return {
      baseUrl: 'https://localization-dev.int.bbpd.io',
      password: 'b862b10d2ae1'
    };
  } else if (hostname === 'contentpartnershipssaasqa-client') {
    return {
      baseUrl: 'https://contentpartnershipssaasqa-client.blackboard.com',
      password: '0f8721371c3d'
    };
  } else if (hostname === 'bb-icm-internal') {
    return {
      baseUrl: 'https://bb-icm-internal.bbpd.io',
      password: 'a7dab6105718'
    };
  } else if (hostname === 'bb-consulting-stage') {
    return {
      baseUrl: 'https://bb-consulting-stage.bbpd.io',
      password: 'bf058f20265f'
    };
  } else if (hostname === 'bb-consulting-bd-stage') {
    return {
      baseUrl: 'https://bb-consulting-bd-stage.bbpd.io',
      password: '1ab0ceb52335'
    };
  } else if (hostname === 'b2dev-k12-new') {
    return {
      baseUrl: 'https://b2dev-k12-new.int.bbpd.io',
      password: '02815466f3f2'
    };
  } else if (hostname === 'internal-ultrareadiness') {
    return {
      baseUrl: 'https://internal-ultrareadiness.blackboard.com',
      password: '1a13fbfec120'
    };
  } else if (hostname === 'mobile-pf-test') {
    return {
      baseUrl: 'https://mobile-pf-test.blackboard.com',
      password: '91528eace2b2'
    };
  } else if (hostname === 'partner-smoke-test-a') {
    return {
      baseUrl: 'https://partner-smoke-test-a.blackboard.com',
      password: '561d4e6d4fcc'
    };
  } else if (hostname === 'partner-smoke-test-b') {
    return {
      baseUrl: 'https://partner-smoke-test-b.blackboard.com',
      password: 'd7c43f061549'
    };
  } else if (hostname === 'contentpartnershipssaasqa-stage') {
    return {
      baseUrl: 'https://contentpartnershipssaasqa-stage.blackboard.com',
      password: 'dfe2648cd901'
    };
  } else if (hostname === 'bb-icm-test') {
    return {
      baseUrl: 'https://bb-icm-test.bbpd.io',
      password: '0aa9e286ee8e'
    };
  } else if (hostname === 'bb-icm-prod') {
    return {
      baseUrl: 'https://bb-icm-prod.bbpd.io',
      password: '6763ecda2536'
    };
  } else if (hostname === 'bb-consulting-bd-prod') {
    return {
      baseUrl: 'https://bb-consulting-bd-prod.bbpd.io',
      password: '397cc1759715'
    };
  } else if (hostname === 'bb-consulting-prod') {
    return {
      baseUrl: 'https://bb-consulting-prod.bbpd.io',
      password: '96bef99e0b8e'
    };
  } else if (hostname === 'sisaas-learn-qa') {
    return {
      baseUrl: 'https://sisaas-learn-qa.int.bbpd.io',
      password: '9b3793c15c64'
    };
  } else if (hostname === 'ultra-predict') {
    return {
      baseUrl: 'https://ultra-predict.int.bbpd.io',
      password: '1389d1ee00ab'
    };
  } else if (hostname === 'b2dev-nahe-new') {
    return {
      baseUrl: 'https://b2dev-nahe-new.int.bbpd.io',
      password: '10887151a7a4'
    };
  } else {
    return 'nope';
  }
};

module.exports = { getLearnConfig };
