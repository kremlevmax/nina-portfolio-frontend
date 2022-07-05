import { useQuery, gql } from "@apollo/client";

const PROJECTSANDMAINPAGE = gql`
  query GetMenuData {
    mainPage {
      data {
        attributes {
          name
          projects
          info
        }
      }
    }

    projects {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

export const useMenu = () => {
  return useQuery(PROJECTSANDMAINPAGE);
};
