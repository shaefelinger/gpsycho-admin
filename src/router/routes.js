
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/kommentare',
        component: () => import('pages/EditComments.vue')
      },
      { path: '/newtext', component: () => import('pages/NewText.vue') },
      {
        path: '/auth',
        component: () => import('pages/PageAuth.vue')
      }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
