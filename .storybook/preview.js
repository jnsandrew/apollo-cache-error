import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing'; // Use for Apollo Version 3+
import { initialize, mswLoader } from 'msw-storybook-addon';

import { entitiesClient as apolloApiClient } from '../public/js/app/apollo';

import handlers from '../mocking/handlers';

// Initialise MSW so we can mock graphQL
initialize({
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
  onUnhandledRequest: (req, print) => {
    // if (req.url.origin.startsWith('http://localhost:6006')) {
    //   print.warning();
    // }
    return;
  },
});

const preview = {
  // The default value of the theme arg for all stories
  args: {},
  decorators: [
    (Story) => {
      return (
        <ApolloProvider client={apolloApiClient}>
          <Story />
        </ApolloProvider>
      );
    },
  ],
  loaders: [mswLoader],
  parameters: {
    apolloClient: {
      MockedProvider,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers,
    },
  },
};

export default preview;
