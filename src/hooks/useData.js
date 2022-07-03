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
