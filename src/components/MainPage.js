import React from "react";
import { useQuery, gql } from "@apollo/client";

const MAIN_PAGE = gql`
  query GetMainPage {
    mainPage {
      data {
        attributes {
          title
          description
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

export default function MainPage() {
  const { loading, error, data } = useQuery(MAIN_PAGE);

  return (
    <div className='main-page__image-container'>
      {!loading && (
        <img
          src={
            "http://localhost:1337" +
            data.mainPage.data.attributes.image.data[0].attributes.formats.large
              .url
          }
          alt={data.mainPage.data.attributes.title}
        />
      )}
    </div>
  );
}
