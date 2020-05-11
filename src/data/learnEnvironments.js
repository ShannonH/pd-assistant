export const LEARNS = [
  { label: 'https://ultra-canary.bbpd.io', hostname: 'ultra-canary' },
  { label: 'https://ultra-next.bbpd.io', hostname: 'ultra-next' },
  {
    label: 'https://qa-ultra-adv-dev.int.bbpd.io',
    hostname: 'qa-ultra-adv-dev'
  },
  {
    label: 'https://qa-original-std-dev.int.bbpd.io',
    hostname: 'qa-original-std-dev'
  },
  {
    label: 'https://qa-original-adv-dev.int.bbpd.io',
    hostname: 'qa-original-adv-dev'
  },
  { label: 'https://qa-ultra-adv-rc.int.bbpd.io', hostname: 'qa-ultra-adv-rc' },
  {
    label: 'https://qa-trylearn-std-rc.int.bbpd.io',
    hostname: 'qa-trylearn-std-rc'
  },
  {
    label: 'https://qa-original-adv-rc.int.bbpd.io',
    hostname: 'qa-original-adv-rc'
  },
  { label: 'https://qa-mooc-std-rc.int.bbpd.io', hostname: 'qa-mooc-std-rc' },
  {
    label: 'https://qa-ultra-adv-clienttest-latest.bbpd.io',
    hostname: 'qa-ultra-adv-clienttest-latest'
  },
  {
    label: 'https://qa-original-adv-clienttest-latest.bbpd.io',
    hostname: 'qa-original-adv-clienttest-latest'
  },
  {
    label: 'https://qa-ultra-adv-clienttest.int.bbpd.io',
    hostname: 'qa-ultra-adv-clienttest'
  },
  {
    label: 'https://qa-original-adv-clienttest.int.bbpd.io',
    hostname: 'qa-original-adv-clienttest'
  },
  { label: 'https://qa-ultra-adv-ga.int.bbpd.io', hostname: 'qa-ultra-adv-ga' },
  {
    label: 'https://qa-original-adv-ga.int.bbpd.io',
    hostname: 'qa-original-adv-ga'
  },
  {
    label: 'https://qa-original-std-ga.int.bbpd.io',
    hostname: 'qa-original-std-ga'
  },
  {
    label: 'https://qa-original-std-ivp2.int.bbpd.io',
    hostname: 'qa-original-std-ivp2'
  },
  {
    label: 'https://qa-original-std-ivp3400x.bbpd.io',
    hostname: 'qa-original-std-ivp3400x'
  },
  {
    label: 'https://qa-original-adv-ivp3500x.bbpd.io',
    hostname: 'qa-original-adv-ivp3500x'
  },
  { label: 'https://coreservices.int.bbpd.io', hostname: 'coreservices' },
  {
    label: 'https://contentpartnershipssaasqa-dev.blackboard.com',
    hostname: 'contentpartnershipssaasqa-dev'
  },
  { label: 'https://ultra-sec1.int.bbpd.io', hostname: 'ultra-sec' },
  {
    label: 'https://localization-dev.int.bbpd.io',
    hostname: 'localization-dev'
  },
  {
    label: 'https://contentpartnershipssaasqa-client.blackboard.com',
    hostname: 'contentpartnershipssaasqa-client'
  },
  { label: 'https://bb-icm-internal.bbpd.io', hostname: 'bb-icm-internal' },
  {
    label: 'https://bb-consulting-stage.bbpd.io',
    hostname: 'bb-consulting-stage'
  },
  {
    label: 'https://bb-consulting-bd-stage.bbpd.io',
    hostname: 'bb-consulting-bd-stage'
  },
  { label: 'https://b2dev-k12-new.int.bbpd.io', hostname: 'b2dev-k12-new' },
  {
    label: 'https://internal-ultrareadiness.blackboard.com',
    hostname: 'internal-ultrareadiness'
  },
  {
    label: 'https://mobile-pf-test.blackboard.com',
    hostname: 'mobile-pf-test'
  },
  {
    label: 'https://partner-smoke-test-a.blackboard.com',
    hostname: 'partner-smoke-test-a'
  },
  {
    label: 'https://partner-smoke-test-b.blackboard.com',
    hostname: 'partner-smoke-test-b'
  },
  {
    label: 'https://contentpartnershipssaasqa-stage.blackboard.com',
    hostname: 'contentpartnershipssaasqa-stage'
  },
  { label: 'https://bb-icm-test.bbpd.io', hostname: 'bb-icm-test' },
  { label: 'https://bb-icm-prod.bbpd.io', hostname: 'bb-icm-prod' },
  {
    label: 'https://bb-consulting-bd-prod.bbpd.io',
    hostname: 'bb-consulting-bd-prod'
  },
  {
    label: 'https://bb-consulting-prod.bbpd.io',
    hostname: 'bb-consulting-prod'
  },
  { label: 'https://sisaas-learn-qa.int.bbpd.io', hostname: 'sisaas-learn-qa' },
  { label: 'https://ultra-predict.int.bbpd.io', hostname: 'ultra-predict' },
  { label: 'https://b2dev-nahe-new.int.bbpd.io', hostname: 'b2dev-nahe-new' },
  { label: 'Other', hostname: 'Other' }
];

export const mappedLearns = LEARNS.map(learn => ({
  value: learn.hostname,
  label: learn.label
}));
