module.exports = {
  plugins: [
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
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
