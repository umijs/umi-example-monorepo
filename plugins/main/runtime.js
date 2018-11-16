
export function patchRoutes(routes) {
  if (window.g_umi && window.g_umi.monorepo) {
    window.g_umi.monorepo.forEach((repo) => {
      repo.routes.forEach(route => {
        routes[0].routes.unshift(route);
      });
    });
  }

  routes[0].routes.unshift({
    path: '/abc',
    exact: true,
    component: function _default() {
      return React.createElement('div', {}, 'haha')
    },
  });

  console.log(routes);

  window.g_routes = routes;
}

export function render(oldRender) {
  console.log('patch render');
  oldRender();
}
