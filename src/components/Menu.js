import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BottomdMenu } from "./BottomdMenu";
import "./Menu.css";
import { useMenu } from "../hooks/useMenu";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  open: { opacity: 1, height: "auto" },
  close: { opacity: 0, height: 0 },
};

const Menu = ({ siteLanguage, setSiteLanguage }) => {
  const [isProjectsClicked, setIsProjectsClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

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
          className='menu__menu-link'
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
    <div className='menu__menu-container'>
      <div className='menu__menu-top-part'>
        <div className='menu__name-container'>
          <Link className='menu__name-link' to='/'>
            {name}
          </Link>
        </div>

        <div className='menu__menu-part'>
          <span
            className='menu__menu-sublist-title'
            onClick={() => setIsProjectsClicked(!isProjectsClicked)}
          >
            {projectSubdivisionTitle}
          </span>
          <AnimatePresence exitBeforeEnter>
            {isProjectsClicked && (
              <motion.div
                initial='close'
                animate={isProjectsClicked ? "open" : "close"}
                variants={variants}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, height: 0 }}
                className='menu__menu-sublist projects-sublist'
              >
                {projectLinks}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='menu__menu-part'>
          <span
            className='menu__menu-sublist-title'
            onClick={() => setIsInfoClicked(!isInfoClicked)}
          >
            {infoSubdivisionTitle}
          </span>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              initial={false}
              animate={isInfoClicked ? "open" : "close"}
              variants={variants}
              transition={{ duration: 0.7 }}
              exit={"close"}
              className='menu__menu-sublist info-sublist'
            >
              <Link className='menu__menu-link' to='/info1'>
                Info 1
              </Link>
              <Link className='menu__menu-link' to='/info2'>
                Info 2
              </Link>
              <Link className='menu__menu-link' to='/info3'>
                Info 3
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className='menu__bottom-part_large-screen'>
        <BottomdMenu setSiteLanguage={setSiteLanguage} />
      </div>
    </div>
  );
};

export default Menu;
