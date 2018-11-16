import { join } from 'path';

export default (api, options = {}) => {
  api.chainWebpackConfig(config => {
    config.externals({
      'react': 'window.React',
      'react-dom': 'window.ReactDOM',
    });
  });

  api.addHTMLHeadScript(() => {
    const scripts = (options.scripts || []).map(sub => {
      return { src: sub };
    })
    return [
      { src: 'https://unpkg.com/react@16.7.0-alpha.2/umd/react.development.js' },
      { src: 'https://unpkg.com/react-dom@16.7.0-alpha.2/umd/react-dom.development.js' },
      ...scripts,
    ];
  });

  api.addHTMLLink(() => {
    return (options.stylesheets || []).map(sub => {
      return { href: sub, rel: 'stylesheet' };
    });
  });

  api.addRuntimePlugin(
    join(__dirname, 'runtime.js'),
  );
}
