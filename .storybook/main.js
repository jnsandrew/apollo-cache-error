module.exports = {
  stories: [
    '../public/js/features/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        app: `${__dirname}/../public/js/app`,
        config: `${__dirname}/../public/js/app/config`,
        components: `${__dirname}/../public/js/app/components`,
        selectors: `${__dirname}/../public/js/app/selectors`,
        utils: `${__dirname}/../public/js/app/utils`,
        actions: `${__dirname}/../public/js/app/actions`,
        constants: `${__dirname}/../public/js/app/constants`,
        reducers: `${__dirname}/../public/js/app/reducers`,
        api: `${__dirname}/../public/js/app/api`,
        sockets: `${__dirname}/../public/js/sockets`,
        lib: `${__dirname}/../public/js/lib`,
        test: `${__dirname}/../test`,
        features: `${__dirname}/../public/js/features`,
        'pusher-local': `${__dirname}/../mocking/pusher.js`,
        mocking: `${__dirname}/../mocking`,
      };
    }
    return config;
  },

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-apollo-client',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook',
  ],

  core: {
    disableTelemetry: true,
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  staticDirs: ['../public', '../mocking'],

  docs: {
    autodocs: false,
  },
};
