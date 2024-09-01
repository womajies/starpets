import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
});

router.beforeEach(async (to, from, next) => {
  if ('title' in to.meta) {
    document.title = to.meta.title;
    let description = document.querySelector('head meta[name="description"]');
    if (description && to.meta['description'])
      description.setAttribute('content', to.meta.description);
  }

  if (to.name === undefined) {
    next({ name: 'NotFound' });
  }

  next();
});

export default router;
