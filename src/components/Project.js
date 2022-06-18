import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import "./Project.css";
import ImageGallery from "react-image-gallery";
import LoadingBackground from "./LoadingBackground";

const PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      data {
        id
        attributes {
          title
          title_ru
          title_skh
          description
          description_ru
          description_skh
          photos {
            data {
              id
              attributes {
                description
                file {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function Project({ siteLanguage }) {
  const { id } = useParams();
  const { loading, error, data } = useQuery(PROJECT, { variables: { id: id } });

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

  if (!loading)
    return (
      <>
        <div className='project__image-container'>
          <ImageGallery items={images} infinite={true} useTranslate3D={false} />
        </div>
        <div className='project__name-container'>
          <span className='project__name'>{titleString}</span>
        </div>
        <div className='project__description-conatainer'>
          <p className='project__description'>
            {descriptionString}Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </>
    );

  if (loading) return <LoadingBackground />;
}
