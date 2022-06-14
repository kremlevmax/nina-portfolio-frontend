import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./MainPage.css";
import LoadingBackground from "./LoadingBackground";

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

export default function MainPage() {
  const { loading, error, data } = useQuery(MAIN_PAGE);
  if (!loading)
    return (
      <div className='main-page__image-container'>
        {!loading && (
          <img
            className='main-page__image'
            src={
              process.env.REACT_APP_BASE_URL +
              data.mainPage.data.attributes.image.data[0].attributes.formats
                .large.url
            }
            alt={data.mainPage.data.attributes.title}
          />
        )}
      </div>
    );

  if (loading) return <LoadingBackground />;
}
