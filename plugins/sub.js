import assert from 'assert';
import { join, relative } from 'path';
import globby from 'globby';

export default (api) => {
  const { cwd, paths, winPath } = api;
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) return;
  assert(api.pkg.name, `package.json must contains a name property`);

  function routesToJSON(routes) {
    return JSON.stringify(routes, (key, value) => {
      switch (key) {
        case 'component':
          const relPath = winPath(relative(paths.absTmpDirPath, join(cwd, value)))
          return `require('${relPath}').default`;
        default:
          return value;
      }
    }, 2);
  }

  function stripJSONQuotes(str) {
    return str
      .replace(/\"component\": (\"(.+?)\")/g, (global, m1, m2) => {
        return `"component": ${m2.replace(/\^/g, '"')}`;
      });
  }

  function findModels() {
    const models = [
      ...(globby.sync('**/models/**/*.js', {
        cwd: paths.absPagesPath,
      })),
      ...(globby.sync('**/model.js', {
        cwd: paths.absPagesPath,
      })),
    ];
    return models;
  }

  api.onStart(() => {
    process.env.HTML = 'none';
  });

  api.onGenerateFiles(() => {
    const routes = api.routes;
    const routesContent = stripJSONQuotes(routesToJSON(routes));
    const models = findModels().map(model => {
      return `require('../../${model}').default`;
    });
    const content = `
window.g_umi = window.g_umi || {};
window.g_umi.monorepo = window.g_umi.monorepo = [];
window.g_umi.monorepo.push({
  routes: ${routesContent},
  models: [${models.join(',')}],
});
    `.trim();
    api.writeTmpFile('submodule.js', content);
  });

  api.chainWebpackConfig(config => {
    config.entryPoints.clear();
    config.entry(api.pkg.name).add(
      join(api.paths.absTmpDirPath, 'submodule.js'),
    );
    config.externals({
      'react': 'window.React',
      'react-dom': 'window.ReactDOM',
      'dva': 'window.dva',
    });
  });
}
