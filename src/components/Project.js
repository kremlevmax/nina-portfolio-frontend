import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "./Project.css";

const PROJECT = gql`
  query GetProjects($id: ID!) {
    project(id: $id) {
      data {
        id
        attributes {
          title
          description
          photos {
            data {
              id
              attributes {
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

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(PROJECT, { variables: { id: id } });

  const projectName = !loading ? data.project.data.attributes.title : "";
  const projectDescription = !loading
    ? data.project.data.attributes.description
    : "";
  const imageItems = !loading ? data.project.data.attributes.photos.data : [];

  const images = !loading
    ? imageItems.map((imageItem) => (
        <img
          alt={data.project.data.attributes.title}
          src={
            process.env.REACT_APP_BASE_URL +
            imageItem.attributes.file.data[0].attributes.formats.large.url
          }
          key={imageItem.id}
        />
      ))
    : [];

  if (!loading)
    return (
      <div className='project__container'>
        <div className='project__images'>{images}</div>
        <div className='project__name-container'>
          <span className='project__name'>{projectName}</span>
        </div>
        <div className='project__description-conatainer'>
          <span className='project__description'>{projectDescription}</span>
        </div>
      </div>
    );

  if (loading)
    return (
      <div className='project__loader-container'>
        <h1 className='project__loader' data-content='LOADING'>
          LOADING
        </h1>
      </div>
    );
}
