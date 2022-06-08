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

const PROJECTS = gql`
  query GetProjects {
    projects {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

const Menu = () => {
  const [isProjectsClicked, setIsProjectsClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  const projectDisplay = isProjectsClicked ? "flex" : "none";
  const infoDisplay = isInfoClicked ? "flex" : "none";

  const { loading, error, data } = useQuery(PROJECTS);

  const projectLinks = !loading ? (
    data.projects.data.map((project) => (
      <Link
        key={project.id}
        className='menu__link'
        to={`/projects/` + project.id}
      >
        {project.attributes.title}
      </Link>
    ))
  ) : (
    <></>
  );

  return (
    <div className='menu__container'>
      <div className='menu__part name-container'>
        <Link className='menu__name' to='/'>
          Nina Sleptsova
        </Link>
      </div>

      <div className='menu__part'>
        <span
          className='menu__sublist-title'
          onClick={() => setIsProjectsClicked(!isProjectsClicked)}
        >
          Projects
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
          Info
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
