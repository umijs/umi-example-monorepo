
export default {
  history: 'hash',
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      routes: {
        exclude: [
          /model/,
        ],
      },
    }],
    ['../../plugins/main', {
      scripts: [
        '/users.js',
      ],
      stylesheets: [
        '/users.css'
      ],
    }],
  ],
}
