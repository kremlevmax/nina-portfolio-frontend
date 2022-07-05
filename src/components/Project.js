import React from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Project.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

export default function Project({ siteLanguage }) {
  const { id } = useParams();
  const { loading, data } = useProject(id);

  const projectTitlesArray = !loading
    ? [
        data.project.data.attributes.title,
        data.project.data.attributes.title_ru,
        data.project.data.attributes.title_skh,
      ]
    : [];
  const projectDescriptionsArray = !loading
    ? [
        data.project.data.attributes.description,
        data.project.data.attributes.description_ru,
        data.project.data.attributes.description_skh,
      ]
    : [];
  const imageItems = !loading ? data.project.data.attributes.photos.data : [];

  let titleString = "";
  let descriptionString = "";

  switch (siteLanguage) {
    case "skh":
      titleString = !loading ? projectTitlesArray[2] : "";
      descriptionString = !loading ? projectDescriptionsArray[2] : "";
      break;
    case "ru":
      titleString = !loading ? projectTitlesArray[1] : "";
      descriptionString = !loading ? projectDescriptionsArray[1] : "";
      break;
    default:
      titleString = !loading ? projectTitlesArray[0] : "";
      descriptionString = !loading ? projectDescriptionsArray[0] : "";
      break;
  }

  // const images = !loading
  //   ? imageItems.map((imageItem) => ({
  //       original:
  // process.env.REACT_APP_BASE_URL +
  // imageItem.attributes.file.data[0].attributes.formats.large.url,
  //       thumbnail:
  //         process.env.REACT_APP_BASE_URL +
  //         imageItem.attributes.file.data[0].attributes.formats.thumbnail.url,
  //       description: descriptionString,
  //     }))
  //   : [];

  const images = !loading
    ? imageItems.map((imageItem) => (
        <div
          key={
            process.env.REACT_APP_BASE_URL +
            imageItem.attributes.file.data[0].id
          }
          className='project__image-container'
        >
          <img
            className='project__image'
            src={
              process.env.REACT_APP_BASE_URL +
              imageItem.attributes.file.data[0].attributes.formats.large.url
            }
            alt={
              process.env.REACT_APP_BASE_URL +
              imageItem.attributes.file.data[0].attributes.formats.large.url
            }
          />
          <p className='legend'>{imageItem.attributes.description}</p>
        </div>
      ))
    : [];

  // if (loading) return <LoadingBackground />;

  if (!loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className='project__container'
      >
        <div className='project__carousel-container'>
          <Carousel
            infiniteLoop
            // autoPlay
            interval={5000}
            showStatus={false}
            swipeableshowArrows={true}
            animationHandler='fade'
          >
            {images}
          </Carousel>
        </div>
        <div className='project__name-container'>
          <span className='project__name'>{titleString}</span>
        </div>
        <div className='project__description-conatainer'>
          <p className='project__description'>{descriptionString}</p>
        </div>
      </motion.div>
    );
}
