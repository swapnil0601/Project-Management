import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($projectID: ID!) {
    project(id: $projectID) {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };
