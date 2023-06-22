import { gql } from "@apollo/client";
import { BASE_REPOSITORY_DATA, REPOSITORY_DATA, USER_DATA } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...repositoryData
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DATA}
`;

export const GET_REPOSITORY = gql`
  query findRepositoryById($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...baseRepositoryData
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${BASE_REPOSITORY_DATA}
`;

export const GET_USER = gql`
  query getUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              url
            }
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          ...userData
        }
      }
    }
  }
  ${USER_DATA}
`;
