This is a reproduction of a weird issue in apollo where the cache is
updated but the component rerenders with the old data.

This is the only way I can reproduce it - with storybook + msw for mocking.

`yarn install` then `yarn start`

You can see the value is "false", and when clicking the button it is still "false"
when it should be "true". You can see this by looking in the console - it outputs
the response. In response.data, the value is "false", but in response.client.cache.data
the value is "true"

Issue thread: https://github.com/apollographql/apollo-client/issues/5963
