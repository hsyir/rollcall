function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'welcome', component: page('welcome.vue') },

  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },
  { path: '/password/reset', name: 'password.request', component: page('auth/password/email.vue') },
  { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/reset.vue') },
  { path: '/email/verify/:id', name: 'verification.verify', component: page('auth/verification/verify.vue') },
  { path: '/email/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },

  { path: '/home', name: 'home', component: page('home.vue') },

  {
    path: '/settings',
    component: page('settings/index.vue'),
    name: 'settings.index',
    redirect: { name: 'settings.pusher' },
    children: [
      { path: '', redirect: { name: 'settings.pusher' } },
      { path: 'pusher', name: 'settings.pusher', component: page('settings/pusher.vue') },
      { path: 'simotel/profiles', name: 'settings.simotelProfiles', component: page('settings/simotel.vue') },
      { path: 'simotel/usersProfile', name: 'settings.simotelUserProfiles', component: page('settings/simotel_users_profile.vue') },
      { path: 'simotel/callerIdTest', name: 'settings.callerIdTest', component: page('settings/simotel_callerIdTest.vue') }
    ]
  },

  {
    path: '/profile',
    component: page('profile/index.vue'),
    name: 'profile.index',
    redirect: { name: 'profile.my' },
    children: [
      { path: '', redirect: { name: 'profile.my' } },
      { path: 'my', name: 'profile.my', component: page('profile/profile.vue') },
      { path: 'password', name: 'profile.password', component: page('profile/password.vue') }
    ]
  },

  {
    path: '/contacts',
    component: page('contacts/index.vue'),
    name: 'contacts.index',
    redirect: { name: 'persons.list' },
    children: [
      { path: '', redirect: { name: 'persons.list' } },
      { path: 'persons', redirect: { name: 'persons.list' } },
      { path: 'persons/list', name: 'persons.list', component: page('contacts/persons/list.vue') },
      { path: 'persons/create', name: 'persons.create', component: page('contacts/persons/create.vue') },
      { path: 'companies', redirect: { name: 'companies.list' } },
      { path: 'companies/list', name: 'companies.list', component: page('contacts/companies/list.vue') },
      { path: 'companies/create', name: 'companies.create', component: page('contacts/companies/create.vue') }
    ]
  },

  { path: '*', component: page('errors/404.vue') }
]
