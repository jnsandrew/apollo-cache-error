const conditionalPlugins = [];

// This plugin breaks other compilations like testing
if (process.env.NODE_ENV === 'development' && !process.env.STORYBOOK) {
  conditionalPlugins.push('react-refresh/babel');
}

module.exports = {
  plugins: [
    ...conditionalPlugins,

    // make async await work
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],

    // Allow dynamic imports
    '@babel/plugin-syntax-dynamic-import',

    // tree shaking for lodash importing
    'lodash',

    // material ui modules this this { Button }
    // https://material-ui.com/guides/minimizing-bundle-size/
    // note: our bundler doesn't support esm (still don't know what this is really)
    // so we have set `libraryDirectory` to '' based on the MUI docs recommendation
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'icons',
    ],

    // hot reloading
    'react-hot-loader/babel',

    // for unit tests
    [
      'babel-plugin-module-resolver',
      {
        root: ['./public'],
        alias: {
          app: './public/js/app',
          config: './public/js/app/config',
          components: './public/js/app/components',
          selectors: './public/js/app/selectors',
          utils: './public/js/app/utils',
          actions: './public/js/app/actions',
          constants: './public/js/app/constants',
          reducers: './public/js/app/reducers',
          api: './public/js/app/api',
          sockets: './public/js/sockets',
          lib: './public/js/lib',
          test: './test',
          features: './public/js/features',
          mocking: './mocking',
          'pusher-local': './public/js/lib/pusher.js',
        },
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie >= 11'],
        },
      },
    ],
    '@babel/preset-react',
  ],
};
