import gql from 'graphql-tag';

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      user {
        id
        username
        roles
      }
      token
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      user {
        username
        roles
      }
      token
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      user {
        username
        roles
      }
      token
    }
  }
`;

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut
  }
`;

export { ME_QUERY, SIGNUP_MUTATION, SIGNIN_MUTATION, SIGNOUT_MUTATION };
