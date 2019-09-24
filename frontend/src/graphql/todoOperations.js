import gql from 'graphql-tag';

const TODOES_QUERY = gql`
  query TODOES_QUERY($first: Int, $skip: Int = 0) {
    todoes(first: $first, skip: $skip, orderBy: createdAt_ASC) {
      id
      createdAt
      updatedAt
      content
      done
      user {
        username
      }
    }
    todoesConnection {
      aggregate {
        count
      }
    }
  }
`;

const CREATETODO_MUTATION = gql`
  mutation CREATETODO_MUTATION(
    $content: String!
    $done: Boolean! = false
    $username: String!
  ) {
    createTodo(
      data: {
        content: $content
        done: $done
        user: { connect: { username: $username } }
      }
    ) {
      id
      createdAt
      updatedAt
      content
      done
      user {
        username
      }
    }
  }
`;

const DELETETODO_MUTATION = gql`
  mutation DELETETODO_MUTATION($id: ID!) {
    deleteTodo(where: { id: $id }) {
      id
    }
  }
`;

const UPDATETODO_MUTATION = gql`
  mutation UPDATETODO_MUTATION($id: ID!, $content: String!, $done: Boolean!) {
    updateTodo(where: { id: $id }, data: { content: $content, done: $done }) {
      id
      createdAt
      updatedAt
      content
      done
      user {
        username
      }
    }
  }
`;

const TODO_SUBSCRIPTION = gql`
  subscription TODO_SUBSCRIPTION {
    todo {
      mutation
      node {
        id
        createdAt
        updatedAt
        content
        done
        user {
          username
        }
      }
      updatedFields
      previousValues {
        id
        createdAt
        updatedAt
        content
        done
      }
    }
  }
`;

export {
  TODOES_QUERY,
  CREATETODO_MUTATION,
  DELETETODO_MUTATION,
  UPDATETODO_MUTATION,
  TODO_SUBSCRIPTION
};
