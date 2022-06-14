import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faVk,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import "./Menu.css";
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

const Menu = ({ siteLanguage }) => {
  const [isProjectsClicked, setIsProjectsClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  const projectDisplay = isProjectsClicked ? "flex" : "none";
  const infoDisplay = isInfoClicked ? "flex" : "none";

  const { loading, error, data } = useQuery(PROJECTSANDMAINPAGE);

  let projectTitle = "";
  let name = "";
  let projectSubdivisionTitle = "";
  let infoSubdivisionTitle = "";

  const projectLinks = !loading ? (
    data.projects.data.map((project) => {
      switch (siteLanguage) {
        case "ru":
          projectTitle = project.attributes.title_ru;
          name = data.mainPage.data.attributes.name_ru;
          projectSubdivisionTitle = data.mainPage.data.attributes.projects_ru;
          infoSubdivisionTitle = data.mainPage.data.attributes.info_ru;
          break;
        case "skh":
          projectTitle = project.attributes.title_skh;
          name = data.mainPage.data.attributes.name_skh;
          projectSubdivisionTitle = data.mainPage.data.attributes.projects_skh;
          infoSubdivisionTitle = data.mainPage.data.attributes.info_skh;
          break;
        default:
          projectTitle = project.attributes.title;
          name = data.mainPage.data.attributes.name;
          projectSubdivisionTitle = data.mainPage.data.attributes.projects;
          infoSubdivisionTitle = data.mainPage.data.attributes.info;
      }
      return (
        <Link
          key={project.id}
          className='menu__link'
          to={`/projects/` + project.id}
        >
          {projectTitle}
        </Link>
      );
    })
  ) : (
    <></>
  );

  return (
    <div className='menu__container'>
      <div className='menu__part name-container'>
        <Link className='menu__name' to='/'>
          {name}
        </Link>
      </div>

      <div className='menu__part'>
        <span
          className='menu__sublist-title'
          onClick={() => setIsProjectsClicked(!isProjectsClicked)}
        >
          {projectSubdivisionTitle}
        </span>
        <div
          className='menu__sublist projects-sublist'
          style={{ display: projectDisplay }}
        >
          {projectLinks}
        </div>
      </div>

      <div className='menu__part'>
        <span
          className='menu__sublist-title'
          onClick={() => setIsInfoClicked(!isInfoClicked)}
        >
          {infoSubdivisionTitle}
        </span>
        <div
          className='menu__sublist info-sublist'
          style={{ display: infoDisplay }}
        >
          <Link className='menu__link' to='/info1'>
            Info 1
          </Link>
          <Link className='menu__link' to='/info2'>
            Info 2
          </Link>
          <Link className='menu__link' to='/info3'>
            Info 3
          </Link>
        </div>
      </div>

      <div className='menu_part social-links-container'>
        <FontAwesomeIcon icon={faVk} className='menu__social-link-icon' />
        <FontAwesomeIcon icon={faTelegram} className='menu__social-link-icon' />
        <FontAwesomeIcon
          icon={faInstagram}
          className='menu__social-link-icon'
        />
        <FontAwesomeIcon icon={faAt} className='menu__social-link-icon' />
        <FontAwesomeIcon
          icon={faMobileRetro}
          className='menu__social-link-icon'
        />
      </div>
    </div>
  );
};

export default Menu;
