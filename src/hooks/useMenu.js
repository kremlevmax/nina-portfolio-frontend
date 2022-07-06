import { useQuery, gql } from "@apollo/client";

const PROJECTSANDMAINPAGE = gql`
  query GetMenuData {
    mainPage {
      data {
        attributes {
          name
          name_ru
          name_skh
          projects
          projects_ru
          projects_skh
          info
          info_ru
          info_skh
        }
      }
    }

    projects {
      data {
        id
        attributes {
          title
          title_ru
          title_skh
        }
      }
    }
  }
`;

export const useMenu = () => {
  return useQuery(PROJECTSANDMAINPAGE);
};
