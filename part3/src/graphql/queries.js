import { gql } from "@apollo/client";
import { REPOSITORY_DATA, USER_DATA } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryData
        }
      }
    }
  }
  ${REPOSITORY_DATA}
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          ...UserData
        }
      }
    }
  }
  ${USER_DATA}
`;
