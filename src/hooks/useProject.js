import { useQuery, gql } from "@apollo/client";

const PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      data {
        id
        attributes {
          title
          description
          photos {
            data {
              id
              attributes {
                description
                file {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const useProject = (id) => {
  return useQuery(PROJECT, { variables: { id: id } });
};
