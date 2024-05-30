import React from 'react';
import { graphql } from 'msw';

import handlers from 'mocking/handlers';

import ListRow from './index';

const meta = {
  component: ListRow,
  decorators: [
    (Story, { args }) => {
      return <Story />;
    },
  ],
  title: 'Features/Broken',
};

export default meta;

// Does not work at the moment. I suspect it's due to this bug in apollo
// https://github.com/apollographql/apollo-client/issues/5963
// The cache does update, but the component re-renders with stale data

export const CompleteTask = {
  args: {},
  name: 'Complete task',
  parameters: {
    msw: {
      handlers: [
        graphql.query('TaskEntityListQuery', (req, res, ctx) =>
          res(
            ctx.data({
              taskEntityList: [
                {
                  avatar: null,
                  id: 2001,
                  completed: false,
                  created_at: '2023-11-27T09:45:00.274Z',
                  __typename: 'Task',
                },
              ],
            }),
          ),
        ),
        graphql.mutation('UpdateTaskEntityMutation', (req, res, ctx) =>
          res(
            ctx.data({
              updateTaskEntity: {
                id: 2001,
                completed: req.variables.data.completed,
                __typename: 'Task',
              },
            }),
          ),
        ),
        ...handlers,
      ],
    },
  },
};
