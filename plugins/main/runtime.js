
export function patchRoutes(routes) {
  (window.g_umi && window.g_umi.monorepo || []).forEach((repo) => {
    repo.routes.forEach(route => {
      // add routes under first layout
      routes[0].routes.unshift(route);
    });
  });
  window.g_routes = routes;
}

export function render(oldRender) {
  console.log('patch render');
  oldRender();
}
