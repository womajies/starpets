import convert from './convert';
import notFound from './not-found';

export default [
  {
    path: '/',
    component: () => import('@/pages/index'),
    name: 'HomePage',
    meta: {
      title: 'Главная',
    },
  },
  ...convert,
  ...notFound,
];
