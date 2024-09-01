export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404',
    },
    component: () => import('@/pages/not-found'),
  },
];
