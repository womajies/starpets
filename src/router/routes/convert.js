export default [
  {
    path: '/convert',
    component: () => import('@/pages/convert.vue'),
    name: 'ConvertPage',
    meta: {
      title: 'Конвертация',
    },
  },
];
