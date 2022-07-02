import React from "react";
import "./MainPage.css";
import LoadingBackground from "./LoadingBackground";
import { useMainPage } from "../hooks/useMainPage";

export default function MainPage() {
  const { loading, data } = useMainPage();
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
