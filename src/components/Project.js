import React from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import "./Project.css";
import ImageGallery from "react-image-gallery";
import LoadingBackground from "./LoadingBackground";

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

  const images = !loading
    ? imageItems.map((imageItem) => ({
        original:
          process.env.REACT_APP_BASE_URL +
          imageItem.attributes.file.data[0].attributes.formats.large.url,
        thumbnail:
          process.env.REACT_APP_BASE_URL +
          imageItem.attributes.file.data[0].attributes.formats.thumbnail.url,
        description: descriptionString,
      }))
    : [];

  if (loading) return <LoadingBackground />;

  return (
    <>
      <div className='project__image-container'>
        <ImageGallery items={images} infinite={true} useTranslate3D={false} />
      </div>
      <div className='project__name-container'>
        <span className='project__name'>{titleString}</span>
      </div>
      <div className='project__description-conatainer'>
        <p className='project__description'>{descriptionString}</p>
      </div>
    </>
  );
}
