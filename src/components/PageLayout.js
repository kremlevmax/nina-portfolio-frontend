import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BottomdMenu } from "./BottomdMenu";
import "./PageLayout.css";
import { useMenu } from "../hooks/useMenu";
import { Outlet } from "react-router-dom";

const PageLayout = ({ siteLanguage, setSiteLanguage }) => {
  const [isProjectsClicked, setIsProjectsClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  const projectDisplay = isProjectsClicked ? "flex" : "none";
  const infoDisplay = isInfoClicked ? "flex" : "none";

  const { loading, data } = useMenu();

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
          className='page-layout__menu-link'
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
    <div className='page-layout__container'>
      <div className='page-layout__menu-container'>
        <div className='page-layout__menu-top-part'>
          <div className='page-layout__name-container'>
            <Link className='page-layout__name-link' to='/'>
              {name}
            </Link>
          </div>

          <div className='page-layout__menu-part'>
            <span
              className='page-layout__menu-sublist-title'
              onClick={() => setIsProjectsClicked(!isProjectsClicked)}
            >
              {projectSubdivisionTitle}
            </span>
            <div
              className='page-layout__menu-sublist projects-sublist'
              style={{ display: projectDisplay }}
            >
              {projectLinks}
            </div>
          </div>

          <div className='page-layout__menu-part'>
            <span
              className='page-layout__menu-sublist-title'
              onClick={() => setIsInfoClicked(!isInfoClicked)}
            >
              {infoSubdivisionTitle}
            </span>
            <div
              className='page-layout__menu-sublist info-sublist'
              style={{ display: infoDisplay }}
            >
              <Link className='page-layout__menu-link' to='/info1'>
                Info 1
              </Link>
              <Link className='page-layout__menu-link' to='/info2'>
                Info 2
              </Link>
              <Link className='page-layout__menu-link' to='/info3'>
                Info 3
              </Link>
            </div>
          </div>
        </div>
        <div className='menu__bottom-part_large-screen'>
          <BottomdMenu setSiteLanguage={setSiteLanguage} />
        </div>
      </div>
      <div className='page-layout__image-container'>
        <Outlet />
      </div>
      <div className='menu__bottom-menu_small-screens'>
        <BottomdMenu setSiteLanguage={setSiteLanguage} />
      </div>
    </div>
  );
};

export default PageLayout;
