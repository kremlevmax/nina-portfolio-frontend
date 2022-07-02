import { useQuery, gql } from "@apollo/client";

const MAIN_PAGE = gql`
  query GetMainPage {
    mainPage {
      data {
        attributes {
          image {
            data {
              id
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export const useMainPage = () => {
  return useQuery(MAIN_PAGE);
};
