import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SecondMenu } from "./SecondMenu";
import "./Menu.css";
import { useMenu } from "../hooks/useMenu";

const Menu = ({ siteLanguage, setSiteLanguage }) => {
  const [isProjectsClicked, setIsProjectsClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  const projectDisplay = isProjectsClicked ? "flex" : "none";
  const infoDisplay = isInfoClicked ? "flex" : "none";

  const { loading, error, data } = useMenu();

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
      <div className='menu__top-part'>
        <div className='name-container'>
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
      </div>
      <div className='menu__bottom-part-first'>
        <SecondMenu setSiteLanguage={setSiteLanguage} />
      </div>
    </div>
  );
};

export default Menu;
