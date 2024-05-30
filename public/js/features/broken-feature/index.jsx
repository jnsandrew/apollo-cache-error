import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const QUERY = gql`
  query TaskEntityListQuery {
    taskEntityList {
      id
      avatar
      created_at
      entity_type_id
      completed
    }
  }
`;

const MUTATION = gql`
  mutation UpdateTaskEntityMutation($id: Int!, $data: JSONObject) {
    updateTaskEntity(id: $id, data: $data) {
      id
      completed
    }
  }
`;

const EntityRow = () => {
  const response = useQuery(QUERY, {});
  const [updateEntity] = useMutation(MUTATION, {});

  const toggleTaskCompleted = async () => {
    const newCompleted = true;

    if (updateEntity) {
      await updateEntity({
        variables: {
          id: 2001,
          data: {
            completed: newCompleted,
          },
        },
        optimisticResponse: {
          updateTaskEntity: {
            __typename: 'Task', // eslint-disable-line no-underscore-dangle
            id: 2001,
            completed: newCompleted,
          },
        },
      });
    }
  };

  // Compare response.data, to response.client.cache.data
  // completed should be true after clicking the button
  console.log('Response::', response);

  return (
    <>
      <p>
        The task is completed? -{' '}
        {response?.data?.taskEntityList[0].completed.toString()}
      </p>
      <button type="button" onClick={toggleTaskCompleted}>
        complete task
      </button>
    </>
  );
};

export default EntityRow;
