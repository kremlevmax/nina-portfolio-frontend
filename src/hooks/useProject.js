import { useQuery, gql } from "@apollo/client";

const PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      data {
        id
        attributes {
          title
          title_ru
          title_skh
          description
          description_ru
          description_skh
          photos {
            data {
              id
              attributes {
                description
                description_ru
                description_skh
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
