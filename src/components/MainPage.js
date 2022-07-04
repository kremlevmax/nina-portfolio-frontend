import React from "react";
import "./MainPage.css";
// import LoadingBackground from "./LoadingBackground";
import { useMainPage } from "../hooks/useMainPage";
import { motion } from "framer-motion";

export default function MainPage() {
  const { loading, data } = useMainPage();

  if (!loading)
    return (
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className='main-page__image'
        src={
          process.env.REACT_APP_BASE_URL +
          data.mainPage.data.attributes.image.data[0].attributes.formats.large
            .url
        }
        alt={data.mainPage.data.attributes.title}
      />
    );
}
